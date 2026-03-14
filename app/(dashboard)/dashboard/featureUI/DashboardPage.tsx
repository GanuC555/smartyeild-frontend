'use client';

import Link from 'next/link';
import AgentStatusCards from './AgentStatusCards';
import StrategyDonut from './StrategyDonut';
import TwoPoolVisual from './TwoPoolVisual';
import YieldCounter from './YieldCounter';
import { useDashboardOverview } from '../featureService/useDashboardOverview';

export default function DashboardPage() {
  const { agents, hasDeposit, history, isLoading, portfolio, principal } =
    useDashboardOverview();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-white/40">Loading portfolio…</div>
      </div>
    );
  }

  if (!hasDeposit) {
    return (
      <div className="py-24 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white">Welcome to OneYield&Spend</h2>
        <p className="mx-auto mb-8 max-w-md text-white/50">
          Deposit USDC and AI agents start earning 5–35% APY for you.
        </p>
        <Link
          href="/vault"
          className="inline-block rounded-xl bg-teal-500 px-8 py-4 font-bold text-black transition-colors hover:bg-teal-400"
        >
          Make Your First Deposit →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="mb-1 text-sm text-white/50">Your Principal</p>
          <p className="text-3xl font-bold text-white">
            ${principal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <span className="mt-1 inline-block text-xs font-medium text-green-400">
            100% INTACT
          </span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="mb-1 text-sm text-white/50">Yield Earned</p>
          <YieldCounter
            initialYield={Number(portfolio?.totalYield || 0)}
            perSecondRate={Number(portfolio?.perSecondEarnRate || 0)}
          />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="mb-1 text-sm text-white/50">Available to Spend</p>
          <p className="text-3xl font-bold text-teal-400">
            ${Number(portfolio?.availableToSpend || 0).toLocaleString('en-US', {
              minimumFractionDigits: 2,
            })}
          </p>
          <Link
            href="/history"
            className="mt-1 inline-block text-xs text-teal-400/60 transition-colors hover:text-teal-400"
          >
            View history →
          </Link>
        </div>
      </div>

      <TwoPoolVisual
        liquidBalance={Number(portfolio?.liquidBalance || 0)}
        strategyPool={Number(portfolio?.strategyPool || 0)}
        dailyEarnRate={Number(portfolio?.dailyEarnRate || 0)}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StrategyDonut />
        <AgentStatusCards agents={agents} />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-4 font-semibold text-white">Recent Activity</h3>
        {history.length === 0 ? (
          <p className="text-sm text-white/30">No activity yet.</p>
        ) : (
          <div className="space-y-3">
            {history.slice(0, 5).map((tx) => (
              <div
                key={tx._id || tx.id || `${tx.type}-${tx.createdAt}`}
                className="flex items-center justify-between border-b border-white/5 py-2 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      tx.type === 'deposit'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}
                  >
                    {tx.type === 'deposit' ? '↓' : '→'}
                  </div>
                  <div>
                    <p className="text-sm capitalize text-white">
                      {tx.type.replace('_', ' ')}
                    </p>
                    <p className="text-xs text-white/30">
                      {new Date(tx.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-sm font-medium ${
                    tx.type === 'deposit' ? 'text-green-400' : 'text-white'
                  }`}
                >
                  {tx.type === 'deposit' ? '+' : '-'}${Number(tx.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
