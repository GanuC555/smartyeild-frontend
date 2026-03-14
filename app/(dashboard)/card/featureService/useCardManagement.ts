'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { cardApi } from '@/lib/api/client';
import type {
  CardStatus,
  CardTransaction,
} from '../types/card-management.types';

export function useCardManagement() {
  const [loading, setLoading] = useState(false);

  const statusQuery = useQuery<CardStatus>({
    queryKey: ['card-status'],
    queryFn: cardApi.status,
    retry: false,
  });

  const transactionsQuery = useQuery<CardTransaction[]>({
    queryKey: ['card-transactions'],
    queryFn: cardApi.transactions,
    refetchInterval: 20_000,
    retry: false,
  });

  // Card backend module does not exist yet — surface this clearly
  const cardUnavailable =
    statusQuery.isError || (!statusQuery.isLoading && !statusQuery.data?.issued && !statusQuery.data);

  const issueCard = async () => {
    setLoading(true);
    try {
      await cardApi.issue();
      toast.success('Virtual card issued');
      await statusQuery.refetch();
    } catch {
      toast.error('Card feature coming soon');
    } finally {
      setLoading(false);
    }
  };

  const toggleFreeze = async () => {
    setLoading(true);
    try {
      if (statusQuery.data?.frozen) {
        await cardApi.unfreeze();
        toast.success('Card unfrozen');
      } else {
        await cardApi.freeze();
        toast.success('Card frozen');
      }
      await statusQuery.refetch();
    } catch {
      toast.error('Card feature coming soon');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    card: statusQuery.data,
    cardUnavailable,
    transactions: transactionsQuery.data ?? [],
    issueCard,
    toggleFreeze,
  };
}
