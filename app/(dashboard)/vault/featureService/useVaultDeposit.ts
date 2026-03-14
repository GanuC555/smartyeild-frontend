'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { vaultApi } from '@/lib/api/client';
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
    if (!amount || Number(amount) <= 0) {
      toast.error('Enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      await vaultApi.demoConfirm(DEFAULT_VAULT_ID, amount);
      toast.success('Deposit confirmed');
      router.push('/vault/strategy');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Deposit failed';
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
