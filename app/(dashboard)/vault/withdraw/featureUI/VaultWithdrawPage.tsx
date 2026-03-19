'use client';

import Link from 'next/link';
import { useVaultWithdraw } from '../featureService/useVaultWithdraw';

export default function VaultWithdrawPage() {
  const { loading, position, positionLoading, isMatured, submitWithdraw } = useVaultWithdraw();

  const maturityDate = position
    ? new Date(position.maturityMs).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const daysRemaining = position
    ? Math.max(0, Math.ceil((position.maturityMs - Date.now()) / 86_400_000))
    : 0;

  return (
    <div className="mx-auto max-w-2xl space-y-16">

      {/* Page identity */}
      <div>
        <p className="art-label mb-3">Vault</p>
        <h1 className="text-4xl font-light text-foreground/90" style={{ letterSpacing: '-0.02em' }}>
          Withdraw Principal
        </h1>
        <p className="mt-2 text-sm text-foreground/40">
          Reclaim your deposited USDC by burning your Fixed Receipt Tokens
        </p>
      </div>

      {positionLoading ? (
        <p className="text-sm text-foreground/40">Loading position…</p>
      ) : !position ? (
        /* No active position */
        <div className="space-y-4">
          <p className="text-sm text-foreground/55">
            You have no active vault position. Deposit USDC to start earning yield.
          </p>
          <Link
            href="/vault"
            className="inline-block rounded-xl border border-foreground/10 px-5 py-3 text-sm text-foreground/60 transition-colors hover:border-foreground/20 hover:text-foreground/90"
          >
            ← Go to Deposit
          </Link>
        </div>
      ) : (
        /* Active position */
        <div className="space-y-10">

          {/* Position stats */}
          <div className="flex items-stretch gap-0">
            <div className="flex-1">
              <p className="art-label mb-2">Principal</p>
              <p
                className="text-2xl font-light text-foreground/85 tabular-nums"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                ${position.principal.toFixed(2)}
              </p>
            </div>
            <div className="art-divider-v" />
            <div className="flex-1 px-8">
              <p className="art-label mb-2">Maturity Date</p>
              <p className="text-2xl font-light text-foreground/85">{maturityDate}</p>
            </div>
            <div className="art-divider-v" />
            <div className="flex-1 pl-8">
              <p className="art-label mb-2">Days Remaining</p>
              <p
                className="text-2xl font-light tabular-nums"
                style={{
                  fontVariantNumeric: 'tabular-nums',
                  color: isMatured ? 'hsl(142, 71%, 45%)' : 'hsl(217, 80%, 56%)',
                }}
              >
                {isMatured ? 'Ready' : `${daysRemaining}d`}
              </p>
            </div>
          </div>

          {/* What you'll receive */}
          <div className="space-y-1 text-sm text-foreground/55">
            <p>
              You will receive{' '}
              <span className="font-medium text-foreground/80">
                ${position.principal.toFixed(2)} USDC
              </span>{' '}
              back to your wallet.
            </p>
            <p className="text-xs text-foreground/35">
              Your FRT tokens are burned on-chain when you withdraw. Yield is separate — claim it via Yield Redemption.
            </p>
          </div>

          {/* Maturity warning */}
          {!isMatured && (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-xs text-amber-400/80">
              Lock period not yet complete. The contract will reject early withdrawal.
              Come back in {daysRemaining} day{daysRemaining !== 1 ? 's' : ''}.
            </div>
          )}

          {/* CTA */}
          <button
            onClick={submitWithdraw}
            disabled={loading || !isMatured}
            className="premium-btn-primary w-full py-4"
          >
            {loading
              ? 'Processing…'
              : isMatured
              ? `Withdraw $${position.principal.toFixed(2)} USDC`
              : `Locked — ${daysRemaining}d remaining`}
          </button>

          <Link
            href="/vault"
            className="block text-center text-xs text-foreground/30 transition-colors hover:text-foreground/60"
          >
            ← Back to Vault
          </Link>
        </div>
      )}
    </div>
  );
}
