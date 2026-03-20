'use client';

import { useQuery } from '@tanstack/react-query';
import { strategyApi } from '@/lib/api/client';

interface AllocationResponse {
  allocation?: { guardian?: number; balancer?: number; hunter?: number };
  blendedAPY?: number;
  strategyPoolTotal?: string;
}

export function useStrategyBreakdown() {
  const query = useQuery<AllocationResponse>({
    queryKey: ['my-allocation'],
    queryFn: strategyApi.myAllocation,
    refetchInterval: 30_000,
  });

  const alloc = query.data?.allocation;
  // Show actual allocation; only fall back to equal split if no position yet
  const guardian = alloc?.guardian ?? 34;
  const balancer = alloc?.balancer ?? 33;
  const hunter = alloc?.hunter ?? 33;

  return {
    isLoading: query.isLoading,
    blendedAPY: query.data?.blendedAPY,
    data: [
      { name: 'Guardian ', value: guardian, color: '#60A5FA' },
      { name: 'Balancer ', value: balancer, color: '#A78BFA' },
      { name: 'Hunter ', value: hunter, color: '#F59E0B' },
    ],
  };
}
