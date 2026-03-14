export default function TwoPoolVisual({
  liquidBalance,
  strategyPool,
  dailyEarnRate,
}: {
  liquidBalance: number;
  strategyPool: number;
  dailyEarnRate: number;
}) {
  const total = liquidBalance + strategyPool;
  const liquidRatio = total > 0 ? (liquidBalance / total) * 100 : 50;
  const strategyRatio = 100 - liquidRatio;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="mb-4 text-white font-semibold">Two-Pool Architecture</h3>
      <div className="h-4 overflow-hidden rounded-full bg-white/10">
        <div className="flex h-full">
          <div className="bg-blue-500" style={{ width: `${liquidRatio}%` }} />
          <div className="bg-purple-500" style={{ width: `${strategyRatio}%` }} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <p className="text-sm text-white/70">
          Liquid: <span className="font-semibold text-blue-400">${liquidBalance.toFixed(2)}</span>
        </p>
        <p className="text-sm text-white/70">
          Strategy: <span className="font-semibold text-purple-400">${strategyPool.toFixed(2)}</span>
        </p>
        <p className="text-sm text-white/70">
          Daily Earn: <span className="font-semibold text-teal-400">${dailyEarnRate.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
}
