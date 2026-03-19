'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useWallet } from '@/lib/wallet/wallet-context';
import { faucetApi } from '@/lib/api/client';

const MAX_FAUCET_BALANCE_USD = 100;

export function useFaucet() {
  const wallet = useWallet();
  const address = wallet.getAddress();

  const [balance, setBalance] = useState<{ raw: string; usd: string } | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [requesting, setRequesting] = useState(false);

  const fetchBalance = useCallback(async () => {
    if (!address) return;
    setLoadingBalance(true);
    try {
      const data = await faucetApi.getUsdBalance(address);
      setBalance({ raw: data.balance, usd: data.balanceUsd });
    } catch {
      setBalance(null);
    } finally {
      setLoadingBalance(false);
    }
  }, [address]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const balanceUsdNum = parseFloat(balance?.usd ?? '0');
  const atLimit = balanceUsdNum >= MAX_FAUCET_BALANCE_USD;

  const requestFaucet = async () => {
    if (atLimit) {
      toast.error(`Balance is already at the ${MAX_FAUCET_BALANCE_USD} USD limit`);
      return;
    }
    setRequesting(true);
    try {
      const result = await faucetApi.requestUsd();
      if (result.success) {
        toast.success(result.message);
        setTimeout(fetchBalance, 15_000);
      } else {
        toast.error(result.message);
      }
    } catch (err: any) {
      toast.error(err?.message ?? 'Faucet request failed');
    } finally {
      setRequesting(false);
    }
  };

  return {
    address,
    balance,
    loadingBalance,
    requesting,
    atLimit,
    maxBalanceUsd: MAX_FAUCET_BALANCE_USD,
    requestFaucet,
    refreshBalance: fetchBalance,
  };
}
