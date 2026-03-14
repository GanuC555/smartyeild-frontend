'use client';

import { useCallback } from 'react';
import { Transaction } from '@onelabs/sui/transactions';
import { useSignAndExecuteTransaction, useSuiClient } from '@onelabs/dapp-kit';
import { ONECHAIN_CONFIG } from './onechain.config';

export function useOneChainTx() {
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();
  const client = useSuiClient();

  const deposit = useCallback(
    async (params: {
      amountOct: bigint;
      maturityDays: 30 | 60 | 90;
      seniorBps: number;
      juniorBps: number;
    }) => {
      const tx = new Transaction();
      const [coin] = tx.splitCoins(tx.gas, [params.amountOct]);

      tx.moveCall({
        target: `${ONECHAIN_CONFIG.packageId}::vault::deposit`,
        arguments: [
          tx.object(ONECHAIN_CONFIG.vaultObjectId),
          coin,
          tx.pure.u64(BigInt(params.maturityDays)),
          tx.pure.u64(BigInt(params.seniorBps)),
          tx.pure.u64(BigInt(params.juniorBps)),
          tx.object('0x6'), // Clock object ID (standard on Sui/OneChain)
        ],
      });

      return signAndExecute({ transaction: tx });
    },
    [signAndExecute],
  );

  const settlePayment = useCallback(
    async (params: { amountOct: bigint; recipientAddress: string }) => {
      const tx = new Transaction();
      tx.moveCall({
        target: `${ONECHAIN_CONFIG.packageId}::spend_buffer::settle_payment`,
        arguments: [
          tx.object(ONECHAIN_CONFIG.spendBufferObjectId),
          tx.pure.u64(params.amountOct),
          tx.pure.address(params.recipientAddress),
        ],
      });
      return signAndExecute({ transaction: tx });
    },
    [signAndExecute],
  );

  const getSpendBalance = useCallback(
    async (userAddress: string) => {
      if (!ONECHAIN_CONFIG.spendBufferObjectId) {
        return { yieldBalance: 0n, advanceBalance: 0n };
      }
      try {
        const obj = await client.getObject({
          id: ONECHAIN_CONFIG.spendBufferObjectId,
          options: { showContent: true },
        });
        const fields = (obj.data?.content as any)?.fields;
        if (!fields) return { yieldBalance: 0n, advanceBalance: 0n };
        const tableId = fields.balances?.fields?.id?.id;
        if (!tableId) return { yieldBalance: 0n, advanceBalance: 0n };
        const dynField = await client.getDynamicFieldObject({
          parentId: tableId,
          name: { type: 'address', value: userAddress },
        });
        const balFields = (dynField.data?.content as any)?.fields?.value?.fields;
        if (!balFields) return { yieldBalance: 0n, advanceBalance: 0n };
        return {
          yieldBalance: BigInt(balFields.yield_balance ?? 0),
          advanceBalance: BigInt(balFields.advance_balance ?? 0),
        };
      } catch {
        return { yieldBalance: 0n, advanceBalance: 0n };
      }
    },
    [client],
  );

  return { deposit, settlePayment, getSpendBalance };
}
