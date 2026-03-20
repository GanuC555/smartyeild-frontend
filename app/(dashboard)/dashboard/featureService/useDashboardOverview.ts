'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { agentApi, spendApi, transferApi, userApi } from '@/lib/api/client';
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

  const spendBalanceQuery = useQuery({
    queryKey: ['spend-balance'],
    queryFn: () => spendApi.getBalance(),
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
  const totalValue = Number(portfolioQuery.data?.totalValue || 0);

  // Use spend balance for accurate available-to-spend (yield + advance)
  const yieldBalance = Number(spendBalanceQuery.data?.yieldBalance || portfolioQuery.data?.totalYield || 0);
  const advanceBalance = Number(spendBalanceQuery.data?.liquidBalance || portfolioQuery.data?.liquidBalance || 0);
  const availableToSpend = Number(spendBalanceQuery.data?.totalSpendable || portfolioQuery.data?.availableToSpend || 0);

  return {
    portfolio: portfolioQuery.data,
    agents: agentsQuery.data ?? [],
    history: historyQuery.data ?? [],
    isLoading: portfolioQuery.isLoading,
    hasDeposit: principal > 0 || totalValue > 0 || availableToSpend > 0,
    principal,
    yieldBalance,
    advanceBalance,
    availableToSpend,
  };
}
