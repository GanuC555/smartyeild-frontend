'use client';

import { ConnectModal } from '@onelabs/dapp-kit';
import { useEffect, useState } from 'react';
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
  const [launchClicked, setLaunchClicked] = useState(false);
  const walletConnected = wallet.isConnected();
  const isConnected = launchClicked && walletConnected;

  useEffect(() => {
    if (launchClicked && walletConnected && !loading) {
      void connect();
    }
  }, [launchClicked, walletConnected, loading, connect]);

  const onLaunchClick = () => {
    setLaunchClicked(true);
    if (walletConnected && !loading) {
      void connect();
    }
  };

  const buttonLabel = loading ? 'Signing in...' : isConnected ? 'Sign In' : label;

  // Wallet exists but user hasn't manually launched yet -> keep as launch action
  if (walletConnected) {
    return (
      <GlassButton
        onClick={onLaunchClick}
        disabled={loading}
        className="hero-glass-button z-20"
        contentClassName="text-white font-semibold"
      >
        {buttonLabel}
      </GlassButton>
    );
  }

  // Not connected — use ConnectModal which properly requests all wallet permissions
  return (
    <ConnectModal
      trigger={
        <GlassButton
          onClick={onLaunchClick}
          className="hero-glass-button z-20"
          contentClassName="text-white font-semibold"
        >
          {label}
        </GlassButton>
      }
    />
  );
}
