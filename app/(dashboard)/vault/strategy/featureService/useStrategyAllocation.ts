'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { laneApi } from '@/lib/api/client';
import type { LaneDefinition } from '@/lib/api/client';

export interface LaneAllocation {
  lane1: number; // percentage 0-100
  lane2: number;
  lane3: number;
}

const INITIAL_ALLOCATION: LaneAllocation = {
  lane1: 34,
  lane2: 33,
  lane3: 33,
};

export function useStrategyAllocation() {
  const [allocation, setAllocation] = useState<LaneAllocation>(INITIAL_ALLOCATION);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const lanesQuery = useQuery<LaneDefinition[]>({
    queryKey: ['lanes'],
    queryFn: laneApi.getLanes,
  });

  const total = allocation.lane1 + allocation.lane2 + allocation.lane3;

  type LaneKey = 'lane1' | 'lane2' | 'lane3';

  const updateAllocation = (key: LaneKey, value: number) => {
    const nextValue = Math.max(0, Math.min(100, value));
    const otherKeys = (['lane1', 'lane2', 'lane3'] as LaneKey[]).filter(k => k !== key);

    const remaining = 100 - nextValue;
    const otherTotal = allocation[otherKeys[0]] + allocation[otherKeys[1]];

    let first = Math.round(
      otherTotal === 0 ? remaining / 2 : (allocation[otherKeys[0]] / otherTotal) * remaining,
    );
    let second = remaining - first;
    if (first < 0) first = 0;
    if (second < 0) second = 0;

    setAllocation({
      ...allocation,
      [key]: nextValue,
      [otherKeys[0]]: first,
      [otherKeys[1]]: second,
    });
  };

  const blendedApy = useMemo(() => {
    const lanes = lanesQuery.data;
    if (!lanes) return 0;

    const lane1 = lanes.find(l => l.id === 'lane1');
    const lane2 = lanes.find(l => l.id === 'lane2');
    const lane3 = lanes.find(l => l.id === 'lane3');

    const apy1 = lane1?.spread ?? 7.5;
    const apy2 = (lane2?.impliedAPY ?? 12) * (lane2?.leverageMultiplier ?? 5);
    const apy3 = lane3?.ytImpliedAPY ?? lane3?.srNusdAPY ?? 6.5;

    return (
      (allocation.lane1 / 100) * apy1 +
      (allocation.lane2 / 100) * apy2 +
      (allocation.lane3 / 100) * apy3
    );
  }, [allocation, lanesQuery.data]);

  const confirmAllocation = async () => {
    if (Math.abs(total - 100) > 1) {
      toast.error('Allocation must sum to 100%');
      return;
    }

    setLoading(true);
    try {
      // Convert percentages to basis points
      await laneApi.allocate({
        lane1Bps: Math.round(allocation.lane1 * 100),
        lane2Bps: Math.round(allocation.lane2 * 100),
        lane3Bps: Math.round((100 - allocation.lane1 - allocation.lane2) * 100),
      });
      toast.success('Lane allocation set. Protocol routing active.');
      router.push('/dashboard');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to set allocation';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    allocation,
    setAllocation,
    loading,
    lanes: lanesQuery.data,
    total,
    blendedApy,
    updateAllocation,
    confirmAllocation,
  };
}
