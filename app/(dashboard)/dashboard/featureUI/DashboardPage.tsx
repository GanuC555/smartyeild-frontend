'use client';

import Link from 'next/link';
import AgentStatusCards from './AgentStatusCards';
import StrategyDonut from './StrategyDonut';
import TwoPoolVisual from './TwoPoolVisual';
import YieldCounter from './YieldCounter';
import { useDashboardOverview } from '../featureService/useDashboardOverview';

export default function DashboardPage() {
  const { agents, hasDeposit, history, isLoading, portfolio, principal, yieldBalance, advanceBalance, availableToSpend } =
    useDashboardOverview();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="art-label tracking-widest">Loading portfolio…</p>
      </div>
    );
  }

  if (!hasDeposit) {
    return (
      <div className="py-32 text-center">
        <p className="art-label mb-6 tracking-widest">OneYield&Spend</p>
        <h2
          className="mb-5 text-4xl font-light text-foreground/90"
          style={{ letterSpacing: '-0.02em' }}
        >
          Your yield is waiting.
        </h2>
        <p className="mx-auto mb-10 max-w-sm text-sm text-foreground/40 leading-relaxed">
          Deposit USDC. AI agents earn 5–35% APY. Spend your yield anywhere,
          instantly.
        </p>
        <Link href="/vault" className="premium-btn-primary inline-block px-8 py-3 text-sm">
          Make Your First Deposit →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-16">

      {/* ── Stat Strip: three numbers, no boxes ── */}
      <div className="flex items-stretch gap-0">

        {/* Principal */}
        <div className="flex-1 pr-8">
          <p className="art-label mb-3">Principal</p>
          <p
            className="text-4xl font-light text-foreground/90 tabular-nums"
            style={{ letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}
          >
            ${principal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="mt-2 text-[11px] text-foreground/30">100% intact</p>
        </div>

        <div className="art-divider-v" />

        {/* Yield Earned — pink, live */}
        <div className="flex-1 px-8">
          <p className="art-label mb-3">Yield Earned</p>
          <YieldCounter
            initialYield={Number(portfolio?.totalYield || 0)}
            perSecondRate={Number(portfolio?.perSecondEarnRate || 0)}
          />
        </div>

        <div className="art-divider-v" />

        {/* Available to Spend */}
        <div className="flex-1 pl-8">
          <p className="art-label mb-3">Available to Spend</p>
          <p
            className="text-3xl font-light text-foreground/90 tabular-nums"
            style={{ letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}
          >
            ${availableToSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <div className="mt-2 flex gap-4 text-[11px] text-foreground/30">
            <span>Yield <span className="text-foreground/50">${yieldBalance.toFixed(2)}</span></span>
            <span>Advance <span className="text-foreground/50">${advanceBalance.toFixed(2)}</span></span>
          </div>
        </div>
      </div>

      {/* ── Two-Pool Architecture ── */}
      <TwoPoolVisual
        liquidBalance={Number(portfolio?.liquidBalance || 0)}
        strategyPool={Number(portfolio?.strategyPool || 0)}
        dailyEarnRate={Number(portfolio?.dailyEarnRate || 0)}
      />

      {/* ── Strategy + Agents ── */}
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <StrategyDonut />
        <AgentStatusCards agents={agents} />
      </div>

      {/* ── Recent Activity ── */}
      <div>
        <p className="art-label mb-6">Recent Activity</p>
        {history.length === 0 ? (
          <p className="text-sm text-foreground/30">No activity yet.</p>
        ) : (
          <div>
            {history.slice(0, 5).map((tx) => (
              <div
                key={tx._id || tx.id || `${tx.type}-${tx.createdAt}`}
                className="art-row"
              >
                <div className="flex items-center gap-4">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="shrink-0 text-foreground/30"
                  >
                    {tx.type === 'deposit' ? (
                      <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    ) : (
                      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    )}
                  </svg>
                  <div>
                    <p className="text-sm capitalize text-foreground/80">
                      {tx.type.replace('_', ' ')}
                    </p>
                    <p className="text-[11px] text-foreground/30">
                      {new Date(tx.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <span
                  className="text-sm text-foreground/60 tabular-nums"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {tx.type === 'deposit' ? '+' : '−'}${Number(tx.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
