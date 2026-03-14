'use client';

import { useQuery } from '@tanstack/react-query';
import { strategyApi } from '@/lib/api/client';

interface StrategyAllocation {
  guardian?: number;
  balancer?: number;
  hunter?: number;
}

export function useStrategyBreakdown() {
  const query = useQuery<StrategyAllocation>({
    queryKey: ['my-allocation'],
    queryFn: strategyApi.myAllocation,
    refetchInterval: 30_000,
  });

  return {
    isLoading: query.isLoading,
    data: [
      { name: 'Guardian', value: query.data?.guardian ?? 34, color: '#60A5FA' },
      { name: 'Balancer', value: query.data?.balancer ?? 33, color: '#A78BFA' },
      { name: 'Hunter', value: query.data?.hunter ?? 33, color: '#F59E0B' },
    ],
  };
}
