'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { spendApi } from '@/lib/api/client';
import { useOneChainTx } from '@/lib/onechain/useOneChainTx';

export function useSpend() {
  const queryClient = useQueryClient();
  const { settlePayment } = useOneChainTx();

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
    mutationFn: async (params: {
      recipientAddress: string;
      amount: string;
      note?: string;
    }) => {
      // First settle on-chain
      const onChainResult = await settlePayment({
        amountOct: BigInt(Math.round(Number(params.amount) * 1_000_000)),
        recipientAddress: params.recipientAddress,
      });

      // Then record in backend with the real tx digest
      return spendApi.qrPay({
        ...params,
        txDigest: onChainResult.digest,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spend-balance'] });
      queryClient.invalidateQueries({ queryKey: ['spend-history'] });
    },
  });

  return { balance, balanceLoading, history, historyLoading, qrPay: qrPayMutation };
}
