'use client';

import { useVaultDeposit } from '../featureService/useVaultDeposit';

export default function VaultDepositPage() {
  const {
    amount,
    loading,
    preview,
    quickAmounts,
    setAmount,
    submitDeposit,
    vault,
  } = useVaultDeposit();

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Deposit USDC</h1>
        <p className="mt-2 text-white/50">Start earning yield with AI-managed strategies</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: 'Total Value Locked',
            value: `$${Number(vault?.totalAssets || 0).toLocaleString()}`,
          },
          { label: 'Blended APY', value: `${vault?.apy ?? 12.5}%` },
          {
            label: 'Share Price',
            value: `$${Number(vault?.sharePrice || 1).toFixed(4)}`,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/10 bg-white/5 p-4 text-center"
          >
            <p className="mb-1 text-xs text-white/40">{item.label}</p>
            <p className="font-bold text-white">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div>
          <label className="mb-2 block text-sm text-white/50">Amount (USDC)</label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0.00"
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-xl text-white outline-none transition-colors focus:border-teal-400/50"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-medium text-white/30">
              USDC
            </span>
          </div>

          <div className="mt-2 flex gap-2">
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount)}
                className="rounded-lg bg-white/10 px-3 py-1 text-xs text-white/50 transition-colors hover:bg-white/20 hover:text-white"
              >
                ${quickAmount}
              </button>
            ))}
          </div>
        </div>

        {preview && Number(amount) > 0 ? (
          <div className="rounded-xl border border-teal-500/20 bg-teal-500/10 p-4">
            <p className="text-sm text-teal-400">
              You will receive:{' '}
              <span className="font-bold">{Number(preview.shares || 0).toFixed(4)} OYS shares</span>
            </p>
            <p className="mt-1 text-xs text-white/40">
              50% ({(Number(amount) / 2).toFixed(2)} USDC) → Liquid Balance | 50%
              → Strategy Pool
            </p>
          </div>
        ) : null}

        <div className="space-y-1 text-xs text-white/25">
          <p>• Deposit split 50% liquid (always accessible), 50% strategy pool</p>
          <p>• Principal is protected — only yield and liquid can be spent</p>
          <p>• AI agents optimize yield within approved protocol limits only</p>
        </div>

        <button
          onClick={submitDeposit}
          disabled={loading || !amount || Number(amount) <= 0}
          className="w-full rounded-xl bg-teal-500 py-4 font-bold text-black transition-colors hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Processing…' : `Deposit ${amount || '0'} USDC`}
        </button>
      </div>
    </div>
  );
}
