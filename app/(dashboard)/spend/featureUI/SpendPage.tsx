'use client';
import { useState } from 'react';
import { useSpend } from '../featureService/useSpend';
import QRPayModal from './QRPayModal';

export default function SpendPage() {
  const { balance, history, balanceLoading } = useSpend();
  const [showQRPay, setShowQRPay] = useState(false);

  const totalSpendable = balance?.totalSpendable || '0';
  const yieldBalance = balance?.yieldBalance || '0';
  const liquidBalance = balance?.liquidBalance || '0';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light tracking-tight">Spend</h1>
        <p className="text-sm text-foreground/40 mt-1">Pay from yield, never from principal</p>
      </div>

      <div className="rounded-2xl border border-foreground/10 p-6">
        <p className="text-sm text-foreground/50 mb-1">Available to Spend</p>
        <p className="text-4xl font-light mb-4">${(Number(totalSpendable) / 1e6).toFixed(2)}</p>
        <div className="flex gap-6 text-sm text-foreground/50">
          <span>From yield: <span className="text-foreground/80">${(Number(yieldBalance) / 1e6).toFixed(2)}</span></span>
          <span>From advance: <span className="text-foreground/80">${(Number(liquidBalance) / 1e6).toFixed(2)}</span></span>
        </div>
        <p className="text-xs text-foreground/30 mt-2">Spend order: yield first → advance second. Principal never touched.</p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setShowQRPay(true)}
          className="flex-1 py-4 bg-teal-500 hover:bg-teal-400 text-black font-bold rounded-2xl"
        >
          QR Pay
        </button>
        <button
          disabled
          className="flex-1 py-4 border border-foreground/10 rounded-2xl text-sm text-foreground/30 cursor-not-allowed"
        >
          Card (coming soon)
        </button>
      </div>

      <div>
        <h3 className="text-base font-medium mb-4">Recent Spends</h3>
        {(!history || history.length === 0) && (
          <p className="text-sm text-foreground/40">No spends yet. Your balance grows daily.</p>
        )}
        {history?.map((tx) => (
          <div key={tx._id} className="flex items-center justify-between py-3 border-b border-foreground/5">
            <div>
              <p className="text-sm">{tx.type === 'qr_pay' ? 'QR Pay' : 'P2P Transfer'}</p>
              <p className="text-xs text-foreground/40">
                {tx.note || tx.recipient.slice(0, 10) + '...'} · Paid from {tx.settlementSource}
              </p>
            </div>
            <span className="text-sm font-medium">-${(Number(tx.amount) / 1e6).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {showQRPay && <QRPayModal onClose={() => setShowQRPay(false)} />}
    </div>
  );
}
