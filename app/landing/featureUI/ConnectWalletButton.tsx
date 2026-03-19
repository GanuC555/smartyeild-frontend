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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const walletConnected = wallet.isConnected();
  const isConnected = launchClicked && walletConnected;

  const log = (event: string, details?: Record<string, unknown>) => {
    console.info('[LandingHero][LaunchApp]', event, {
      walletConnected,
      launchClicked,
      isModalOpen,
      loading,
      ...details,
    });
  };

  useEffect(() => {
    log('effect-check');
    if (!launchClicked || !walletConnected || loading) return;

    // Run auth once per launch click and prevent repeated re-triggers.
    log('effect-trigger-connect');
    setLaunchClicked(false);
    setIsModalOpen(false);
    void connect();
  }, [launchClicked, walletConnected, loading, connect]);

  const onLaunchClick = () => {
    log('button-click');
    setLaunchClicked(true);
    if (!walletConnected) {
      log('open-connect-modal');
      setIsModalOpen(true);
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
      open={isModalOpen}
      onOpenChange={(open) => {
        log('modal-open-change', { open });
        setIsModalOpen(open);
      }}
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
