'use client';

import { Card } from '@/components/ui/card';
import { useTransactionHistory } from '../featureService/useTransactionHistory';

export default function TransactionHistoryPage() {
  const { isLoading, transactions } = useTransactionHistory();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Transaction History</h1>
        <p className="mt-2 text-white/50">Recent vault, transfer, and settlement events.</p>
      </div>

      <Card>
        {isLoading ? (
          <p className="text-white/40">Loading history…</p>
        ) : transactions.length === 0 ? (
          <p className="text-white/40">No transactions yet.</p>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx._id || tx.id || `${tx.type}-${tx.createdAt}`}
                className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0"
              >
                <div>
                  <p className="text-sm capitalize text-white">
                    {(tx.type || 'event').replace('_', ' ')}
                  </p>
                  <p className="text-xs text-white/40">
                    {new Date(tx.createdAt || Date.now()).toLocaleString()}
                  </p>
                </div>
                <p className="font-semibold text-white">${Number(tx.amount || 0).toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
