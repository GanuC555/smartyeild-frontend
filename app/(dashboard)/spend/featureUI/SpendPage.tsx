'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSpend } from '../featureService/useSpend';
import QRPayModal from './QRPayModal';

export default function SpendPage() {
  const { balance, history, balanceLoading } = useSpend();
  const searchParams = useSearchParams();
  const [showQRPay, setShowQRPay] = useState(false);
  const [prefillTo, setPrefillTo] = useState('');
  const [prefillAmount, setPrefillAmount] = useState('');

  useEffect(() => {
    const to = searchParams.get('to') ?? '';
    const amount = searchParams.get('amount') ?? '';
    if (to || amount) {
      setPrefillTo(to);
      setPrefillAmount(amount);
      setShowQRPay(true);
    }
  }, [searchParams]);

  const totalSpendable = balance?.totalSpendable || '0';
  const yieldBalance = balance?.yieldBalance || '0';
  const liquidBalance = balance?.liquidBalance || '0';

  return (
    <div className="space-y-16">

      {/* Page identity */}
      <div>
        <p className="art-label mb-3">Spend</p>
        <h1 className="text-4xl font-light text-foreground/90" style={{ letterSpacing: '-0.02em' }}>
          Pay from yield
        </h1>
        <p className="mt-2 text-sm text-foreground/40">Principal is never touched</p>
      </div>

      {/* Balance — large number, no box */}
      <div>
        <p className="art-label mb-3">Available to Spend</p>
        <p
          className="text-5xl font-light text-foreground/90 tabular-nums"
          style={{ letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}
        >
          ${Number(totalSpendable).toFixed(2)}
        </p>

        <div className="mt-4 flex gap-8 text-sm text-foreground/40">
          <span>
            From yield{' '}
            <span className="font-medium text-foreground/65">${Number(yieldBalance).toFixed(2)}</span>
          </span>
          <span>
            From advance{' '}
            <span className="font-medium text-foreground/65">${Number(liquidBalance).toFixed(2)}</span>
          </span>
        </div>

        <p className="mt-2 text-xs text-foreground/25">
          Yield spent first, advance second. Principal never touched.
        </p>
      </div>

      {/* Actions — blue CTA only */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowQRPay(true)}
          className="premium-btn-primary flex-1 py-4"
        >
          QR Pay
        </button>
        <button
          disabled
          className="flex-1 cursor-not-allowed rounded-xl border border-foreground/8 py-4 text-sm text-foreground/25"
        >
          Card (coming soon)
        </button>
      </div>

      {/* Recent spends — clean list */}
      {history && history.length > 0 && (
        <div>
          <p className="art-label mb-6">Recent Spends</p>
          <div>
            {history.map((tx) => (
              <div key={tx._id} className="art-row">
                <div>
                  <p className="text-sm text-foreground/80">
                    {tx.type === 'qr_pay' ? 'QR Pay' : 'P2P Transfer'}
                  </p>
                  <p className="text-[11px] text-foreground/35">
                    {tx.note || tx.recipient.slice(0, 10) + '…'} · {tx.settlementSource}
                  </p>
                </div>
                <span className="text-sm font-medium text-foreground/70 tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  −${Number(tx.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {(!history || history.length === 0) && !balanceLoading && (
        <p className="text-sm text-foreground/30">No spends yet. Your balance grows daily.</p>
      )}

      {showQRPay && (
        <QRPayModal
          onClose={() => { setShowQRPay(false); setPrefillTo(''); setPrefillAmount(''); }}
          initialRecipient={prefillTo}
          initialAmount={prefillAmount}
        />
      )}
    </div>
  );
}
