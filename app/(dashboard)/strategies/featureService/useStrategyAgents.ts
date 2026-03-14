'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { agentApi } from '@/lib/api/client';
import type { AgentRecord } from '../types/strategy-agents.types';

export function useStrategyAgents() {
  const [running, setRunning] = useState<string | null>(null);

  const query = useQuery<AgentRecord[]>({
    queryKey: ['agents-status-page'],
    queryFn: agentApi.status,
    refetchInterval: 30_000,
  });

  const triggerRun = async (strategy: string) => {
    setRunning(strategy);

    try {
      await agentApi.run(strategy);
      toast.success(`${strategy} agent run triggered`);
      await query.refetch();
    } catch {
      toast.error('Unable to trigger run. Backend may not expose this action yet.');
    } finally {
      setRunning(null);
    }
  };

  return {
    agents: query.data ?? [],
    isLoading: query.isLoading,
    running,
    triggerRun,
  };
}
