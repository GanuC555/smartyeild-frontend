'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCurrentAccount } from '@onelabs/dapp-kit';
import { spendApi } from '@/lib/api/client';
import { useOneChainTx } from '@/lib/onechain/useOneChainTx';

export function useSpend() {
  const queryClient = useQueryClient();
  const account = useCurrentAccount();
  const { settlePayment, getSpendBalance } = useOneChainTx();

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
      const amountBaseUnits = BigInt(Math.round(Number(params.amount) * 1_000_000));

      // Pre-flight: check on-chain balance to avoid EUserNotFound / EInsufficientBalance abort
      if (account?.address) {
        const onChain = await getSpendBalance(account.address);
        const onChainTotal = onChain.yieldBalance + onChain.advanceBalance;
        if (onChainTotal < amountBaseUnits) {
          throw new Error(
            onChainTotal === 0n
              ? 'Your spending credit hasn\'t been confirmed on-chain yet. This syncs automatically after deposit — please try again in a moment.'
              : `Insufficient on-chain balance. Available: $${(Number(onChainTotal) / 1_000_000).toFixed(2)} USDC`,
          );
        }
      }

      // Settle on-chain
      const onChainResult = await settlePayment({
        amountUsd: amountBaseUnits,
        recipientAddress: params.recipientAddress,
      });

      // Record in backend with the real tx digest
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
