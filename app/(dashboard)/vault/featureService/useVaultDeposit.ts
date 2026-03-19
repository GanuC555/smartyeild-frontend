'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { vaultApi } from '@/lib/api/client';
import { useOneChainTx } from '@/lib/onechain/useOneChainTx';
import { useWallet } from '@/lib/wallet/wallet-context';
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
  const wallet = useWallet();
  const { deposit: onChainDeposit, hasVaultPosition } = useOneChainTx();

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

  const MIN_DEPOSIT_USD = 10; // vault contract MIN_DEPOSIT = 10_000_000 (6 decimals)

  const submitDeposit = async () => {
    const numAmount = Number(amount);
    if (!amount || numAmount <= 0) {
      toast.error('Enter a valid amount');
      return;
    }
    if (numAmount < MIN_DEPOSIT_USD) {
      toast.error(`Minimum deposit is ${MIN_DEPOSIT_USD} USD`);
      return;
    }

    setLoading(true);
    try {
      // Guard: contract aborts if user already has an open position (table::add EFieldAlreadyExists)
      const address = wallet.getAddress();
      if (address) {
        const alreadyDeposited = await hasVaultPosition(address);
        if (alreadyDeposited) {
          toast.error('You already have an active position. Withdraw first before depositing again.');
          setLoading(false);
          return;
        }
      }

      const result = await onChainDeposit({
        amountUsd: BigInt(Math.round(numAmount * 1_000_000)), // MOCK_USD has 6 decimals (like USDC)
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
    minDepositUsd: MIN_DEPOSIT_USD,
  };
}
