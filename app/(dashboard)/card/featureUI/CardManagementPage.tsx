'use client';

import { useCardManagement } from '../featureService/useCardManagement';

export default function CardManagementPage() {
  const { card, cardUnavailable, issueCard, loading, toggleFreeze, transactions } =
    useCardManagement();

  if (cardUnavailable) {
    return (
      <div className="space-y-16">
        <div>
          <p className="art-label mb-3">Card</p>
          <h1 className="text-4xl font-light text-foreground/90" style={{ letterSpacing: '-0.02em' }}>
            Yield Card
          </h1>
          <p className="mt-2 text-sm text-foreground/40">Spend from accrued yield. Principal remains protected.</p>
        </div>
        <div>
          <p className="text-sm text-foreground/40">Card module is under development. Check back later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16">

      {/* Page identity */}
      <div>
        <p className="art-label mb-3">Card</p>
        <h1 className="text-4xl font-light text-foreground/90" style={{ letterSpacing: '-0.02em' }}>
          Yield Card
        </h1>
        <p className="mt-2 text-sm text-foreground/40">Spend from accrued yield. Principal remains protected.</p>
      </div>

      {/* Card status — no box, just content */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="art-label mb-2">Card Status</p>
            <p className="text-2xl font-light text-foreground/85">
              {card?.issued ? 'Virtual Card Active' : 'No Card Issued'}
            </p>
          </div>
          {card?.issued && (
            <span
              className="text-xs text-foreground/50 border border-foreground/10 rounded-full px-3 py-1"
              style={card.frozen ? { color: 'hsl(325, 90%, 65%)', borderColor: 'hsl(325, 90%, 30%)' } : {}}
            >
              {card.frozen ? 'Frozen' : 'Active'}
            </span>
          )}
        </div>

        {/* CTA — blue for issue, borderless for freeze */}
        <div className="flex gap-3">
          {!card?.issued ? (
            <button onClick={issueCard} disabled={loading} className="premium-btn-primary px-6 py-3">
              {loading ? 'Issuing…' : 'Issue virtual card'}
            </button>
          ) : (
            <button
              onClick={toggleFreeze}
              disabled={loading}
              className="rounded-xl border border-foreground/10 px-6 py-3 text-sm text-foreground/60 transition-colors hover:border-foreground/20 hover:text-foreground/80 disabled:opacity-40"
            >
              {loading ? 'Updating…' : card.frozen ? 'Unfreeze card' : 'Freeze card'}
            </button>
          )}
        </div>
      </div>

      {/* Transactions — clean list */}
      {transactions.length > 0 && (
        <div>
          <p className="art-label mb-6">Recent Transactions</p>
          <div>
            {transactions.slice(0, 10).map((tx) => (
              <div key={tx.id || tx._id} className="art-row">
                <div>
                  <p className="text-sm text-foreground/80">
                    {tx.merchant || tx.description || 'Card purchase'}
                  </p>
                  <p className="text-[11px] text-foreground/35">
                    {new Date(tx.createdAt || Date.now()).toLocaleString()}
                  </p>
                </div>
                <span className="text-sm font-medium text-foreground/70 tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  ${Number(tx.amount || 0).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {transactions.length === 0 && (
        <p className="text-sm text-foreground/30">No card transactions yet.</p>
      )}
    </div>
  );
}
