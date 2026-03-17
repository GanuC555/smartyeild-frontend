'use client';

import { useVaultDeposit } from '../featureService/useVaultDeposit';
import FaucetWidget from './FaucetWidget';

export default function VaultDepositPage() {
  const {
    amount,
    loading,
    minDepositUsd,
    preview,
    quickAmounts,
    setAmount,
    submitDeposit,
    vault,
  } = useVaultDeposit();

  return (
    <div className="mx-auto max-w-2xl space-y-16">

      {/* Page identity */}
      <div>
        <p className="art-label mb-3">Vault</p>
        <h1 className="text-4xl font-light text-foreground/90" style={{ letterSpacing: '-0.02em' }}>
          Deposit USDC
        </h1>
        <p className="mt-2 text-sm text-foreground/40">Start earning yield with AI-managed strategies</p>
      </div>

      {/* Vault stats — inline, no boxes */}
      <div className="flex items-stretch gap-0">
        <div className="flex-1">
          <p className="art-label mb-2">Total Value Locked</p>
          <p className="text-2xl font-light text-foreground/85 tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
            ${Number(vault?.totalAssets || 0).toLocaleString()}
          </p>
        </div>
        <div className="art-divider-v" />
        <div className="flex-1 px-8">
          <p className="art-label mb-2">Blended APY</p>
          <p className="text-2xl font-light text-foreground/85 tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {vault?.apy ?? 12.5}%
          </p>
        </div>
        <div className="art-divider-v" />
        <div className="flex-1 pl-8">
          <p className="art-label mb-2">Share Price</p>
          <p className="text-2xl font-light text-foreground/85 tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
            ${Number(vault?.sharePrice || 1).toFixed(4)}
          </p>
        </div>
      </div>

      {/* Deposit form — no outer box */}
      <div className="space-y-6">
        <div>
          <label className="art-label mb-3 block">
            Amount (USDC) — min ${minDepositUsd}
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-4 text-2xl font-light text-foreground/90 outline-none transition-colors focus:border-foreground/25"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-foreground/30">
              USDC
            </span>
          </div>

          <div className="mt-3 flex gap-2">
            {quickAmounts.map((q) => (
              <button
                key={q}
                onClick={() => setAmount(q)}
                className="rounded-lg border border-foreground/10 px-3 py-1.5 text-xs text-foreground/50 transition-colors hover:border-foreground/20 hover:text-foreground/80"
              >
                ${q}
              </button>
            ))}
          </div>
        </div>

        {/* Preview — plain text, no box */}
        {preview && Number(amount) > 0 && (
          <div className="space-y-1 text-sm text-foreground/55">
            <p>
              You receive{' '}
              <span className="font-medium text-foreground/80">
                {Number(preview.shares || 0).toFixed(4)} OYS shares
              </span>
            </p>
            <p className="text-xs text-foreground/35">
              50% ({(Number(amount) / 2).toFixed(2)} USDC) → Liquid · 50% → Strategy Pool
            </p>
          </div>
        )}

        {/* Protocol notes */}
        <div className="space-y-1.5 text-xs text-foreground/30">
          <p>Deposit splits 50% liquid (always accessible), 50% strategy pool</p>
          <p>Principal is protected — only yield and liquid can be spent</p>
          <p>AI agents optimize yield within approved protocol limits only</p>
        </div>

        {/* CTA — only blue element on this page */}
        <button
          onClick={submitDeposit}
          disabled={loading || !amount || Number(amount) < minDepositUsd}
          className="premium-btn-primary w-full py-4"
        >
          {loading ? 'Processing…' : `Deposit ${amount || '0'} USDC`}
        </button>
      </div>

      <FaucetWidget />
    </div>
  );
}
