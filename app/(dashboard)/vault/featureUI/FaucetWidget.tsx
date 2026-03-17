'use client';

import { useFaucet } from '../featureService/useFaucet';

export default function FaucetWidget() {
  const {
    address,
    balance,
    loadingBalance,
    requesting,
    atLimit,
    maxBalanceUsd,
    requestFaucet,
    refreshBalance,
  } = useFaucet();

  if (!address) return null;

  const canRequest = !atLimit && !requesting;

  return (
    <div className="space-y-4">
      <div className="art-divider-h" />

      <div className="flex items-center justify-between">
        <div>
          <p className="art-label mb-1">Testnet Faucet</p>
          <p className="text-sm text-foreground/50">Get test USD to deposit into the vault</p>
        </div>
        <button
          onClick={refreshBalance}
          disabled={loadingBalance}
          className="text-xs text-foreground/35 transition-colors hover:text-foreground/60 disabled:opacity-40"
        >
          {loadingBalance ? 'Loading…' : 'Refresh'}
        </button>
      </div>

      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-light text-foreground/80 tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
          {loadingBalance ? '…' : balance ? `$${balance.usd}` : '$0.00'}
        </p>
        <p className="text-sm text-foreground/30">USD balance</p>
        {balance && (
          <p className="ml-auto text-xs text-foreground/25 tabular-nums">{balance.raw} units</p>
        )}
      </div>

      <button
        onClick={requestFaucet}
        disabled={!canRequest}
        className="premium-btn-primary w-full py-3"
      >
        {requesting ? 'Minting…' : atLimit ? `Max ${maxBalanceUsd} USD reached` : 'Get 100 USD'}
      </button>

      <p className="text-center text-xs text-foreground/25">
        Free testnet USD · Max {maxBalanceUsd} USD · Arrives in ~15 sec
      </p>
    </div>
  );
}
