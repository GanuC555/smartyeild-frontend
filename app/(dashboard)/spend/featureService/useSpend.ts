'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { spendApi } from '@/lib/api/client';

export function useSpend() {
  const queryClient = useQueryClient();

  const { data: balance, isLoading: balanceLoading } = useQuery({
    queryKey: ['spend-balance'],
    queryFn: () => spendApi.getBalance(),
    refetchInterval: 15_000,
  });

  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ['spend-history'],
    queryFn: () => spendApi.getHistory(),
  });

  const qrPayMutation = useMutation({
    mutationFn: (params: { recipientAddress: string; amount: string; note?: string }) =>
      spendApi.qrPay(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spend-balance'] });
      queryClient.invalidateQueries({ queryKey: ['spend-history'] });
    },
  });

  return { balance, balanceLoading, history, historyLoading, qrPay: qrPayMutation };
}
