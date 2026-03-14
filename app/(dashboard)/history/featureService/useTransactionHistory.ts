'use client';

import { useQuery } from '@tanstack/react-query';
import { transferApi } from '@/lib/api/client';
import type { TransferHistoryRow } from '../types/transaction-history.types';

export function useTransactionHistory() {
  const query = useQuery<TransferHistoryRow[]>({
    queryKey: ['history-page'],
    queryFn: transferApi.history,
    refetchInterval: 20_000,
  });

  return {
    isLoading: query.isLoading,
    transactions: query.data ?? [],
  };
}
