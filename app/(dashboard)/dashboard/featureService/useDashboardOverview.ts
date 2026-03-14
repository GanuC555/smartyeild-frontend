'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { agentApi, transferApi, userApi } from '@/lib/api/client';
import { useStore } from '@/lib/store';
import type {
  AgentStatusItem,
  PortfolioSummary,
  TransferHistoryItem,
} from '../types/dashboard-overview.types';

export function useDashboardOverview() {
  const { setPortfolio } = useStore();

  const portfolioQuery = useQuery<PortfolioSummary>({
    queryKey: ['portfolio'],
    queryFn: userApi.portfolio,
    refetchInterval: 30_000,
  });

  const agentsQuery = useQuery<AgentStatusItem[]>({
    queryKey: ['agents'],
    queryFn: agentApi.status,
    refetchInterval: 60_000,
  });

  const historyQuery = useQuery<TransferHistoryItem[]>({
    queryKey: ['transfer-history'],
    queryFn: transferApi.history,
    refetchInterval: 30_000,
  });

  useEffect(() => {
    if (portfolioQuery.data) {
      setPortfolio(portfolioQuery.data);
    }
  }, [portfolioQuery.data, setPortfolio]);

  const principal = Number(portfolioQuery.data?.totalPrincipal || 0);

  return {
    portfolio: portfolioQuery.data,
    agents: agentsQuery.data ?? [],
    history: historyQuery.data ?? [],
    isLoading: portfolioQuery.isLoading,
    hasDeposit: principal > 0,
    principal,
  };
}
