'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useWallet } from '@/lib/wallet/wallet-context';
import { authApi } from '@/lib/api/client';
import { useStore } from '@/lib/store';

export function useWalletConnect() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const wallet = useWallet();
  const { setAuth } = useStore();

  const connect = async () => {
    setLoading(true);
    try {
      // wallet.connect() is a no-op with dapp-kit — get address from already-connected wallet
      const address = wallet.getAddress();
      if (!address) {
        toast.error('Please connect your wallet first using the Connect button above');
        return;
      }
      const { nonce } = await authApi.getNonce(address);
      const signature = await wallet.signMessage(nonce);
      const { accessToken, refreshToken, user } = await authApi.verify(
        address,
        signature,
      );

      localStorage.setItem('refreshToken', refreshToken);
      setAuth(accessToken, user, address);
      toast.success('Wallet connected');
      router.push('/dashboard');
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Connection failed — verify backend is running';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    connect,
  };
}
