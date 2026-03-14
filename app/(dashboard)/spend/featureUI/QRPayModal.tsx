'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { useSpend } from '../featureService/useSpend';

interface Props {
  onClose: () => void;
}

export default function QRPayModal({ onClose }: Props) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const { qrPay } = useSpend();

  const handleSubmit = async () => {
    if (!recipient || !amount) return;
    try {
      await qrPay.mutateAsync({ recipientAddress: recipient, amount, note });
      toast.success(`Paid ${amount} USDC from yield`);
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Payment failed');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="w-full max-w-md p-6 rounded-2xl border border-foreground/10 bg-background">
        <h2 className="text-xl font-medium mb-6">QR Pay</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-foreground/60 mb-1 block">Recipient Address</label>
            <input
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              placeholder="0x..."
              className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-500/40"
            />
          </div>
          <div>
            <label className="text-sm text-foreground/60 mb-1 block">Amount (USDC)</label>
            <input
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0.00"
              type="number"
              className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-500/40"
            />
          </div>
          <div>
            <label className="text-sm text-foreground/60 mb-1 block">Note (optional)</label>
            <input
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Coffee, lunch..."
              className="w-full bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-teal-500/40"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-foreground/10 rounded-xl text-sm text-foreground/60 hover:bg-foreground/5"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={qrPay.isPending || !recipient || !amount}
            className="flex-1 py-3 bg-teal-500 hover:bg-teal-400 text-black font-bold rounded-xl text-sm disabled:opacity-50"
          >
            {qrPay.isPending ? 'Paying...' : 'Pay from Yield'}
          </button>
        </div>
      </div>
    </div>
  );
}
