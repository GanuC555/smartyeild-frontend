'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useWallet } from '@/lib/wallet/wallet-context';
import { authApi } from '@/lib/api/client';
import { useStore } from '@/lib/store';

export function useWalletConnect() {
  const [loading, setLoading] = useState(false);
  const wallet = useWallet();
  const { setAuth } = useStore();

  const connect = async () => {
    const attemptId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const start = performance.now();

    console.info('[useWalletConnect]', 'connect-start', {
      attemptId,
      walletConnected: wallet.isConnected(),
      address: wallet.getAddress(),
    });

    setLoading(true);
    try {
      // wallet.connect() is a no-op with dapp-kit — get address from already-connected wallet
      const address = wallet.getAddress();
      if (!address) {
        console.warn('[useWalletConnect]', 'missing-address', { attemptId });
        toast.error('Please connect your wallet first using the Connect button above');
        return;
      }

      console.info('[useWalletConnect]', 'request-nonce', { attemptId, address });
      const { nonce } = await authApi.getNonce(address);

      console.info('[useWalletConnect]', 'sign-message', {
        attemptId,
        nonceLength: nonce?.length ?? 0,
      });
      const signature = await wallet.signMessage(nonce);

      console.info('[useWalletConnect]', 'verify-signature', {
        attemptId,
        signatureLength: signature?.length ?? 0,
      });
      const { accessToken, refreshToken, user } = await authApi.verify(
        address,
        signature,
      );

      console.info('[useWalletConnect]', 'verify-success', {
        attemptId,
        hasAccessToken: !!accessToken,
        hasRefreshToken: !!refreshToken,
        userId: user?._id ?? user?.id ?? null,
      });

      localStorage.setItem('refreshToken', refreshToken);
      setAuth(accessToken, user, address);
      toast.success('Wallet connected');
      console.info('[useWalletConnect]', 'auth-success-no-redirect', { attemptId });
    } catch (error: unknown) {
      console.error('[useWalletConnect]', 'sign-in-error', {
        attemptId,
        walletConnected: wallet.isConnected(),
        address: wallet.getAddress(),
        error,
      });
      const message =
        error instanceof Error
          ? error.message
          : typeof error === 'object' && error !== null && 'message' in error
            ? String((error as any).message)
            : typeof error === 'string'
              ? error
              : 'Sign-in failed — check console for details';
      toast.error(message);
    } finally {
      console.info('[useWalletConnect]', 'connect-finish', {
        attemptId,
        elapsedMs: Math.round(performance.now() - start),
      });
      setLoading(false);
    }
  };

  return {
    loading,
    connect,
  };
}
