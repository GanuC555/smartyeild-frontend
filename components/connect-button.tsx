'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useWallet } from '@/lib/wallet/wallet-context';
import { authApi } from '@/lib/api/client';
import { useStore } from '@/lib/store';

interface Props {
  className?: string;
  label?: string;
}

export function ConnectButton({ className, label = 'Connect Wallet' }: Props) {
  const [loading, setLoading] = useState(false);
  const { setAuth } = useStore();
  const router = useRouter();
  const wallet = useWallet();

  const handle = async () => {
    setLoading(true);
    try {
      const address = await wallet.connect();
      const { nonce } = await authApi.getNonce(address);
      const signature = await wallet.signMessage(nonce);
      const { accessToken, refreshToken, user } = await authApi.verify(
        address,
        signature,
      );
      localStorage.setItem('refreshToken', refreshToken);
      setAuth(accessToken, user, address);
      toast.success('Wallet connected!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Connection failed — is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handle}
      disabled={loading}
      className={`px-6 py-3 bg-teal-500 hover:bg-teal-400 text-black font-bold rounded-xl transition-all disabled:opacity-50 cursor-pointer ${className}`}
    >
      {loading ? 'Connecting...' : label}
    </button>
  );
}
