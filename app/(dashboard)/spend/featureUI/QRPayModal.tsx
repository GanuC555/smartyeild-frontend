'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useSpend } from '../featureService/useSpend';
import { getTelegramWebApp, isTelegramMiniApp } from '@/lib/telegram';

interface Props {
  onClose: () => void;
  initialRecipient?: string;
  initialAmount?: string;
}

export default function QRPayModal({ onClose, initialRecipient = '', initialAmount = '' }: Props) {
  const [recipient, setRecipient] = useState(initialRecipient);
  const [amount, setAmount] = useState(initialAmount);
  const [note, setNote] = useState('');
  const { qrPay } = useSpend();
  const inTelegram = isTelegramMiniApp();

  const handleSubmit = useCallback(async () => {
    if (!recipient || !amount) return;
    try {
      await qrPay.mutateAsync({ recipientAddress: recipient, amount, note });
      toast.success(`Paid ${amount} USDC from yield`);
      if (inTelegram) {
        getTelegramWebApp()?.close();
      } else {
        onClose();
      }
    } catch (err: any) {
      toast.error(err.message || 'Payment failed');
      getTelegramWebApp()?.MainButton.hideProgress();
    }
  }, [recipient, amount, note, qrPay, onClose, inTelegram]);

  useEffect(() => {
    if (!inTelegram) return;
    const twa = getTelegramWebApp();
    if (!twa) return;
    const label = amount ? `Pay $${amount} USDC` : 'Pay from Yield';
    twa.MainButton.setText(label).show().onClick(handleSubmit);
    if (!recipient || !amount) twa.MainButton.disable(); else twa.MainButton.enable();
    return () => { twa.MainButton.offClick(handleSubmit).hide(); };
  }, [inTelegram, handleSubmit, recipient, amount]);

  useEffect(() => {
    if (!inTelegram) return;
    const twa = getTelegramWebApp();
    if (!twa) return;
    twa.MainButton.setText(amount ? `Pay $${amount} USDC` : 'Pay from Yield');
    if (!recipient || !amount) twa.MainButton.disable(); else twa.MainButton.enable();
  }, [inTelegram, recipient, amount]);

  const inputClass =
    'w-full rounded-xl border border-foreground/10 bg-foreground/5 px-4 py-3 text-sm text-foreground/85 outline-none transition-colors focus:border-foreground/25 placeholder:text-foreground/25';

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 px-4 pb-6 md:items-center md:pb-0">
      <div className="w-full max-w-md rounded-2xl border border-foreground/10 bg-[hsl(228,30%,5%)] p-6">

        <div className="mb-6 flex items-center justify-between">
          <p className="text-base font-medium text-foreground/85">QR Pay</p>
          <button
            onClick={onClose}
            className="text-sm text-foreground/35 transition-colors hover:text-foreground/60"
          >
            Cancel
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="art-label mb-2 block">Recipient Address</label>
            <input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x…"
              className={inputClass}
            />
          </div>
          <div>
            <label className="art-label mb-2 block">Amount (USDC)</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              type="number"
              className={inputClass}
              style={{ fontVariantNumeric: 'tabular-nums' }}
            />
          </div>
          <div>
            <label className="art-label mb-2 block">Note (optional)</label>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Coffee, lunch…"
              className={inputClass}
            />
          </div>
        </div>

        {!inTelegram && (
          <button
            onClick={handleSubmit}
            disabled={qrPay.isPending || !recipient || !amount}
            className="premium-btn-primary mt-6 w-full py-3"
          >
            {qrPay.isPending ? 'Paying…' : 'Pay from Yield'}
          </button>
        )}
      </div>
    </div>
  );
}
