'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCardManagement } from '../featureService/useCardManagement';

export default function CardManagementPage() {
  const { card, cardUnavailable, issueCard, loading, toggleFreeze, transactions } =
    useCardManagement();

  if (cardUnavailable) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Yield Card</h1>
          <p className="mt-2 text-white/50">
            Spend from accrued yield first. Principal remains protected.
          </p>
        </div>
        <Card className="flex flex-col items-center justify-center py-12">
          <p className="text-xl font-semibold text-white">Card feature coming soon</p>
          <p className="mt-2 text-sm text-white/40">
            The virtual card module is under development. Check back later.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Yield Card</h1>
        <p className="mt-2 text-white/50">
          Spend from accrued yield first. Principal remains protected.
        </p>
      </div>

      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/50">Card status</p>
            <p className="text-xl font-semibold text-white">
              {card?.issued ? 'Virtual Card Active' : 'No Card Issued'}
            </p>
          </div>
          {card?.issued ? (
            <Badge variant={card.frozen ? 'warning' : 'success'}>
              {card.frozen ? 'Frozen' : 'Active'}
            </Badge>
          ) : (
            <Badge variant="neutral">Not issued</Badge>
          )}
        </div>

        <div className="flex gap-3">
          {!card?.issued ? (
            <Button onClick={issueCard} disabled={loading}>
              {loading ? 'Issuing...' : 'Issue virtual card'}
            </Button>
          ) : (
            <Button variant="secondary" onClick={toggleFreeze} disabled={loading}>
              {loading ? 'Updating...' : card.frozen ? 'Unfreeze card' : 'Freeze card'}
            </Button>
          )}
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-xl font-semibold text-white">Recent card transactions</h2>
        {transactions.length === 0 ? (
          <p className="text-sm text-white/40">No card transactions yet.</p>
        ) : (
          <div className="space-y-3">
            {transactions.slice(0, 10).map((tx) => (
              <div
                key={tx.id || tx._id}
                className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0"
              >
                <div>
                  <p className="text-white">{tx.merchant || tx.description || 'Card purchase'}</p>
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
