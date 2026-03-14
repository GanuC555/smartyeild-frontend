'use client';

import { useConnectWallet, useWallets } from '@onelabs/dapp-kit';
import { useWallet } from '@/lib/wallet/wallet-context';
import { useWalletConnect } from '../featureService/useWalletConnect';
import { GlassButton } from '@/components/ui/glass-button';

export default function ConnectWalletButton({
  label = 'Launch App',
}: {
  label?: string;
}) {
  const { loading, connect } = useWalletConnect();
  const wallet = useWallet();
  const isConnected = wallet.isConnected();
  const wallets = useWallets();
  const { mutate: connectWallet, isPending: isConnecting } = useConnectWallet();

  const handleClick = () => {
    if (!isConnected) {
      // Trigger dapp-kit wallet connection — pick first available wallet (OneWallet)
      const target = wallets[0];
      if (target) {
        connectWallet({ wallet: target });
      }
    } else {
      // Wallet already connected — sign nonce and authenticate
      connect();
    }
  };

  const buttonLabel = isConnecting
    ? 'Connecting...'
    : loading
      ? 'Signing in...'
      : isConnected
        ? 'Sign In'
        : label;

  return (
    <GlassButton
      onClick={handleClick}
      disabled={isConnecting || loading}
      className="hero-glass-button z-20"
      contentClassName="text-white font-semibold"
    >
      {buttonLabel}
    </GlassButton>
  );
}
