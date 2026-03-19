'use client';

import { useCallback } from 'react';
import { Transaction } from '@onelabs/sui/transactions';
import { useSignAndExecuteTransaction, useSuiClient, useCurrentAccount } from '@onelabs/dapp-kit';
import { ONECHAIN_CONFIG } from './onechain.config';

export function useOneChainTx() {
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();
  const client = useSuiClient();
  const account = useCurrentAccount();

  const deposit = useCallback(
    async (params: {
      amountUsd: bigint;
      maturityDays: 30 | 60 | 90;
      seniorBps: number;
      juniorBps: number;
    }) => {
      if (!account) throw new Error('Wallet not connected');

      const coinType = ONECHAIN_CONFIG.mockUsdCoinType;

      // Fetch user's MOCK_USD coins
      const coins = await client.getCoins({ owner: account.address, coinType });
      if (!coins.data.length) throw new Error('No USD balance — use the faucet to get USD first');

      const tx = new Transaction();
      tx.setGasBudget(50_000_000); // 0.05 OCT for gas (gas is still paid in OCT)

      // Merge all MOCK_USD coins into the first one if multiple exist
      const [primaryCoin, ...restCoins] = coins.data;
      let sourceCoin = tx.object(primaryCoin.coinObjectId);
      if (restCoins.length > 0) {
        tx.mergeCoins(
          sourceCoin,
          restCoins.map((c) => tx.object(c.coinObjectId)),
        );
      }

      // Split the exact deposit amount — must be wrapped with tx.pure.u64 for PTB serialization
      const [depositCoin] = tx.splitCoins(sourceCoin, [tx.pure.u64(params.amountUsd)]);

      tx.moveCall({
        target: `${ONECHAIN_CONFIG.packageId}::vault::deposit`,
        arguments: [
          tx.object(ONECHAIN_CONFIG.vaultObjectId),
          depositCoin,
          tx.pure.u64(BigInt(params.maturityDays)),
          tx.pure.u64(BigInt(params.seniorBps)),
          tx.pure.u64(BigInt(params.juniorBps)),
          tx.object('0x6'), // Clock object ID (standard on Sui/OneChain)
        ],
      });

      return signAndExecute({ transaction: tx });
    },
    [signAndExecute, client, account],
  );

  const settlePayment = useCallback(
    async (params: { amountUsd: bigint; recipientAddress: string }) => {
      const tx = new Transaction();
      tx.setGasBudget(20_000_000); // 0.02 OCT for gas
      tx.moveCall({
        target: `${ONECHAIN_CONFIG.packageId}::spend_buffer::settle_payment`,
        arguments: [
          tx.object(ONECHAIN_CONFIG.spendBufferObjectId),
          tx.pure.u64(params.amountUsd),
          tx.pure.address(params.recipientAddress),
        ],
      });
      return signAndExecute({ transaction: tx });
    },
    [signAndExecute],
  );

  /** Returns true if this address already has an open position in the vault */
  const hasVaultPosition = useCallback(
    async (userAddress: string): Promise<boolean> => {
      if (!ONECHAIN_CONFIG.vaultObjectId) return false;
      try {
        const obj = await client.getObject({
          id: ONECHAIN_CONFIG.vaultObjectId,
          options: { showContent: true },
        });
        const fields = (obj.data?.content as any)?.fields;
        const tableId = fields?.positions?.fields?.id?.id;
        if (!tableId) return false;
        const dynField = await client.getDynamicFieldObject({
          parentId: tableId,
          name: { type: 'address', value: userAddress },
        });
        return !!dynField.data;
      } catch {
        return false;
      }
    },
    [client],
  );

  const getSpendBalance = useCallback(
    async (userAddress: string) => {
      console.log('[getSpendBalance] called for', userAddress);
      console.log('[getSpendBalance] RPC URL:', ONECHAIN_CONFIG.rpcUrl);
      console.log('[getSpendBalance] spendBufferObjectId:', ONECHAIN_CONFIG.spendBufferObjectId);

      if (!ONECHAIN_CONFIG.spendBufferObjectId) {
        console.warn('[getSpendBalance] BAIL: spendBufferObjectId is empty');
        return { yieldBalance: 0n, advanceBalance: 0n };
      }
      try {
        const obj = await client.getObject({
          id: ONECHAIN_CONFIG.spendBufferObjectId,
          options: { showContent: true },
        });
        console.log('[getSpendBalance] SpendBuffer object raw:', JSON.stringify(obj?.data?.content, null, 2));

        const fields = (obj.data?.content as any)?.fields;
        if (!fields) {
          console.warn('[getSpendBalance] BAIL: no fields on SpendBuffer object');
          return { yieldBalance: 0n, advanceBalance: 0n };
        }

        const tableId = fields.balances?.fields?.id?.id;
        console.log('[getSpendBalance] balances tableId:', tableId);
        if (!tableId) {
          console.warn('[getSpendBalance] BAIL: could not resolve balances table id');
          return { yieldBalance: 0n, advanceBalance: 0n };
        }

        const dynField = await client.getDynamicFieldObject({
          parentId: tableId,
          name: { type: 'address', value: userAddress },
        });
        console.log('[getSpendBalance] dynField raw:', JSON.stringify(dynField?.data?.content, null, 2));

        const balFields = (dynField.data?.content as any)?.fields?.value?.fields;
        console.log('[getSpendBalance] balFields:', balFields);
        if (!balFields) {
          console.warn('[getSpendBalance] BAIL: balFields is null — user entry not found in table');
          return { yieldBalance: 0n, advanceBalance: 0n };
        }

        const result = {
          yieldBalance: BigInt(balFields.yield_balance ?? 0),
          advanceBalance: BigInt(balFields.advance_balance ?? 0),
        };
        console.log('[getSpendBalance] SUCCESS:', result);
        return result;
      } catch (err) {
        console.error('[getSpendBalance] CAUGHT ERROR:', err);
        return { yieldBalance: 0n, advanceBalance: 0n };
      }
    },
    [client],
  );

  /** Get user's MOCK_USD balance */
  const getUsdBalance = useCallback(
    async (userAddress: string): Promise<bigint> => {
      try {
        const coinType = ONECHAIN_CONFIG.mockUsdCoinType;
        const result = await client.getBalance({ owner: userAddress, coinType });
        return BigInt(result.totalBalance);
      } catch {
        return 0n;
      }
    },
    [client],
  );

  /** Withdraw principal by burning all FRT tokens the user holds */
  const withdraw = useCallback(async () => {
    if (!account) throw new Error('Wallet not connected');

    const frtCoinType = ONECHAIN_CONFIG.frtCoinType;
    const frtCoins = await client.getCoins({ owner: account.address, coinType: frtCoinType });
    if (!frtCoins.data.length) throw new Error('No FRT tokens found — nothing to withdraw');

    const tx = new Transaction();
    tx.setGasBudget(40_000_000); // 0.04 OCT for gas

    // Merge all FRT coins into one if multiple exist, then pass the whole thing
    const [primaryFrt, ...restFrt] = frtCoins.data;
    let frtCoin = tx.object(primaryFrt.coinObjectId);
    if (restFrt.length > 0) {
      tx.mergeCoins(
        frtCoin,
        restFrt.map((c) => tx.object(c.coinObjectId)),
      );
    }

    tx.moveCall({
      target: `${ONECHAIN_CONFIG.packageId}::vault::withdraw`,
      arguments: [
        tx.object(ONECHAIN_CONFIG.vaultObjectId),
        frtCoin,
        tx.object('0x6'), // Clock object ID
      ],
    });

    return signAndExecute({ transaction: tx });
  }, [signAndExecute, client, account]);

  return { deposit, withdraw, settlePayment, getSpendBalance, hasVaultPosition, getUsdBalance };
}
