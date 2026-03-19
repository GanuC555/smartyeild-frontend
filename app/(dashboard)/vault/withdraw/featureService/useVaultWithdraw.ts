'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useOneChainTx } from '@/lib/onechain/useOneChainTx';
import { useWallet } from '@/lib/wallet/wallet-context';
import { ONECHAIN_CONFIG } from '@/lib/onechain/onechain.config';
import { useSuiClient } from '@onelabs/dapp-kit';
import type { VaultPosition } from '../types/vault-withdraw.types';

export function useVaultWithdraw() {
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState<VaultPosition | null>(null);
  const [positionLoading, setPositionLoading] = useState(true);

  const router = useRouter();
  const wallet = useWallet();
  const { withdraw: onChainWithdraw } = useOneChainTx();
  const client = useSuiClient();

  // Load the user's vault position and FRT balance on mount
  useEffect(() => {
    const address = wallet.getAddress();
    if (!address) {
      setPositionLoading(false);
      return;
    }

    (async () => {
      try {
        // Fetch FRT balance
        const frtCoins = await client.getCoins({
          owner: address,
          coinType: ONECHAIN_CONFIG.frtCoinType,
        });
        const frtBalance = frtCoins.data.reduce(
          (sum, c) => sum + Number(c.balance),
          0,
        );

        // Fetch vault position for maturity date
        const vaultObj = await client.getObject({
          id: ONECHAIN_CONFIG.vaultObjectId,
          options: { showContent: true },
        });
        const fields = (vaultObj.data?.content as any)?.fields;
        const tableId = fields?.positions?.fields?.id?.id;

        let maturityMs = 0;
        if (tableId) {
          const dynField = await client.getDynamicFieldObject({
            parentId: tableId,
            name: { type: 'address', value: address },
          });
          const posFields = (dynField.data?.content as any)?.fields?.value?.fields;
          if (posFields) {
            maturityMs = Number(posFields.maturity_ms ?? 0);
          }
        }

        if (frtBalance > 0) {
          setPosition({
            principal: frtBalance / 1_000_000, // 6 decimals → USD
            maturityMs,
            frtBalance,
          });
        } else {
          setPosition(null);
        }
      } catch {
        setPosition(null);
      } finally {
        setPositionLoading(false);
      }
    })();
  }, [wallet, client]);

  const isMatured = position ? Date.now() >= position.maturityMs : false;

  const submitWithdraw = async () => {
    if (!position) return;

    setLoading(true);
    try {
      await onChainWithdraw();
      toast.success(`Withdrew $${position.principal.toFixed(2)} USDC successfully`);
      router.push('/vault');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Withdrawal failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    position,
    positionLoading,
    isMatured,
    submitWithdraw,
  };
}
