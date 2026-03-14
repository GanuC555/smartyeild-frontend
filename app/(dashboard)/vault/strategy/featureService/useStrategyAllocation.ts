'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { strategyApi } from '@/lib/api/client';
import type {
  StrategyAllocation,
  StrategyItem,
  StrategyKey,
} from '../types/strategy-allocation.types';

const INITIAL_ALLOCATION: StrategyAllocation = {
  guardian: 34,
  balancer: 33,
  hunter: 33,
};

export function useStrategyAllocation() {
  const [allocation, setAllocation] = useState<StrategyAllocation>(INITIAL_ALLOCATION);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const strategiesQuery = useQuery<StrategyItem[]>({
    queryKey: ['strategies'],
    queryFn: strategyApi.list,
  });

  const total = allocation.guardian + allocation.balancer + allocation.hunter;

  const updateAllocation = (key: StrategyKey, value: number) => {
    const nextValue = Math.max(0, Math.min(100, value));
    const otherKeys = (['guardian', 'balancer', 'hunter'] as StrategyKey[]).filter(
      (entry) => entry !== key,
    );

    const remaining = 100 - nextValue;
    const otherTotal = allocation[otherKeys[0]] + allocation[otherKeys[1]];

    let first = Math.round(
      otherTotal === 0 ? remaining / 2 : (allocation[otherKeys[0]] / otherTotal) * remaining,
    );

    let second = remaining - first;

    if (first < 0) {
      first = 0;
    }

    if (second < 0) {
      second = 0;
    }

    setAllocation({
      ...allocation,
      [key]: nextValue,
      [otherKeys[0]]: first,
      [otherKeys[1]]: second,
    });
  };

  const blendedApy = useMemo(() => {
    const strategies = strategiesQuery.data;

    if (!strategies) {
      return 0;
    }

    const guardianApy = strategies.find((s) => s.id === 'guardian')?.currentAPY ?? 6.2;
    const balancerApy = strategies.find((s) => s.id === 'balancer')?.currentAPY ?? 12.8;
    const hunterApy = strategies.find((s) => s.id === 'hunter')?.currentAPY ?? 24.7;

    return (
      (allocation.guardian / 100) * guardianApy +
      (allocation.balancer / 100) * balancerApy +
      (allocation.hunter / 100) * hunterApy
    );
  }, [allocation, strategiesQuery.data]);

  const confirmAllocation = async () => {
    if (Math.abs(total - 100) > 1) {
      toast.error('Allocation must sum to 100%');
      return;
    }

    setLoading(true);
    try {
      await strategyApi.allocate(allocation);
      toast.success('Strategy set. AI agents are now working.');
      router.push('/dashboard');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to set strategy';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    allocation,
    setAllocation,
    loading,
    strategies: strategiesQuery.data,
    total,
    blendedApy,
    updateAllocation,
    confirmAllocation,
  };
}
