'use client';

import { useTransactionHistory } from '../featureService/useTransactionHistory';

export default function TransactionHistoryPage() {
  const { isLoading, transactions } = useTransactionHistory();

  return (
    <div className="space-y-16">

      {/* Page identity */}
      <div>
        <p className="art-label mb-3">History</p>
        <h1 className="text-4xl font-light text-foreground/90" style={{ letterSpacing: '-0.02em' }}>
          Transactions
        </h1>
        <p className="mt-2 text-sm text-foreground/40">
          Vault, transfer, and settlement events
        </p>
      </div>

      {/* List */}
      {isLoading && (
        <div className="space-y-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-12 rounded-lg bg-foreground/5 animate-pulse" />
          ))}
        </div>
      )}

      {!isLoading && transactions.length === 0 && (
        <p className="text-sm text-foreground/30">No transactions yet.</p>
      )}

      {!isLoading && transactions.length > 0 && (
        <div>
          {transactions.map((tx) => {
            const isDeposit = tx.type === 'deposit';
            return (
              <div
                key={tx._id || tx.id || `${tx.type}-${tx.createdAt}`}
                className="art-row"
              >
                <div className="flex items-center gap-4">
                  {/* Thin directional arrow */}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="shrink-0 text-foreground/30"
                  >
                    {isDeposit ? (
                      <path
                        d="M7 2v10M2 7l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ) : (
                      <path
                        d="M2 7h10M7 2l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                  </svg>
                  <div>
                    <p className="text-sm capitalize text-foreground/80">
                      {(tx.type || 'event').replace('_', ' ')}
                    </p>
                    <p className="text-[11px] text-foreground/35">
                      {new Date(tx.createdAt || Date.now()).toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-foreground/70 tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {isDeposit ? '+' : '−'}${Number(tx.amount || 0).toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
