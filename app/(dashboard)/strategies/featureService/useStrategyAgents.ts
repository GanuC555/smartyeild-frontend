'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { laneApi, agentApi } from '@/lib/api/client';
import type { LaneDefinition } from '@/lib/api/client';

export function useStrategyAgents() {
  const [running, setRunning] = useState<string | null>(null);

  const query = useQuery<LaneDefinition[]>({
    queryKey: ['lanes-status'],
    queryFn: laneApi.getLanes,
    refetchInterval: 30_000,
  });

  const lane1DecisionsQuery = useQuery({
    queryKey: ['lane1-decisions'],
    queryFn: () => laneApi.getDecisions('lane1'),
    refetchInterval: 60_000,
  });
  const lane2DecisionsQuery = useQuery({
    queryKey: ['lane2-decisions'],
    queryFn: () => laneApi.getDecisions('lane2'),
    refetchInterval: 60_000,
  });
  const lane3DecisionsQuery = useQuery({
    queryKey: ['lane3-decisions'],
    queryFn: () => laneApi.getDecisions('lane3'),
    refetchInterval: 60_000,
  });

  const triggerLane = async (lane: string) => {
    setRunning(lane);
    try {
      await agentApi.run(lane);
      toast.success(`${lane} decision cycle triggered`);
      await query.refetch();
    } catch {
      toast.error('Unable to trigger lane. Backend may not be running.');
    } finally {
      setRunning(null);
    }
  };

  return {
    lanes: query.data ?? [],
    isLoading: query.isLoading,
    running,
    triggerLane,
    lane1Decisions: lane1DecisionsQuery.data ?? [],
    lane2Decisions: lane2DecisionsQuery.data ?? [],
    lane3Decisions: lane3DecisionsQuery.data ?? [],
  };
}
