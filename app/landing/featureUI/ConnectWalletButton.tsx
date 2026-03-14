'use client';

import { ConnectButton } from '@onelabs/dapp-kit';
import { useWallet } from '@/lib/wallet/wallet-context';
import { useWalletConnect } from '../featureService/useWalletConnect';
import { GlassButton } from '@/components/ui/glass-button';

export default function ConnectWalletButton({
  label = 'Sign In',
}: {
  label?: string;
}) {
  const { loading, connect } = useWalletConnect();
  const wallet = useWallet();
  const isConnected = wallet.isConnected();

  // Step 1: not connected → show dapp-kit ConnectButton to connect OneWallet
  if (!isConnected) {
    return <ConnectButton />;
  }

  // Step 2: connected → sign the nonce to authenticate with backend
  return (
    <GlassButton
      onClick={connect}
      disabled={loading}
      className="hero-glass-button z-20"
      contentClassName="text-white font-semibold"
    >
      {loading ? 'Signing in...' : label}
    </GlassButton>
  );
}
