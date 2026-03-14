'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { vaultApi } from '@/lib/api/client';
import { useOneChainTx } from '@/lib/onechain/useOneChainTx';
import {
  DEFAULT_VAULT_ID,
  QUICK_DEPOSIT_AMOUNTS,
} from '../constants/vault-deposit.constants';
import type {
  DepositPreview,
  VaultSummary,
} from '../types/vault-deposit.types';

export function useVaultDeposit() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { deposit: onChainDeposit } = useOneChainTx();

  const vaultQuery = useQuery<VaultSummary>({
    queryKey: ['vault'],
    queryFn: () => vaultApi.get(DEFAULT_VAULT_ID),
    refetchInterval: 30_000,
  });

  const previewQuery = useQuery<DepositPreview>({
    queryKey: ['preview-deposit', amount],
    queryFn: () => vaultApi.previewDeposit(DEFAULT_VAULT_ID, amount),
    enabled: Number(amount) > 0,
  });

  const submitDeposit = async () => {
    const numAmount = Number(amount);
    if (!amount || numAmount <= 0) {
      toast.error('Enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      const result = await onChainDeposit({
        amountOct: BigInt(Math.round(numAmount * 1_000_000)),
        maturityDays: 30,
        seniorBps: 5000,
        juniorBps: 5000,
      });

      // Record the deposit in the backend for DB tracking
      try {
        await vaultApi.submitDeposit(
          DEFAULT_VAULT_ID,
          result.digest,
          amount,
        );
      } catch {
        // Backend recording is optional — on-chain tx already succeeded
      }

      toast.success('Deposit confirmed on-chain');
      router.push('/vault/strategy');
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Deposit failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    amount,
    setAmount,
    loading,
    submitDeposit,
    vault: vaultQuery.data,
    preview: previewQuery.data,
    quickAmounts: QUICK_DEPOSIT_AMOUNTS,
  };
}
