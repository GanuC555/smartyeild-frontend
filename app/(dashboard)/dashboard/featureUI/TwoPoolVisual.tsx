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

  const formatRate = (n: number) => {
    if (n >= 1) return n.toFixed(2);
    if (n >= 0.01) return n.toFixed(4);
    return n.toFixed(6);
  };

  return (
    <div>
      {/* 2px thin split bar — the identity of this component, gradient on the bar not text */}
      <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-foreground/10">
        <div
          className="absolute left-0 top-0 h-full"
          style={{ width: `${liquidRatio}%`, background: 'hsl(217, 80%, 56%)' }}
        />
        <div
          className="absolute top-0 h-full"
          style={{ left: `${liquidRatio}%`, right: 0, background: 'hsl(325, 90%, 65%)' }}
        />
      </div>

      {/* Three stats — no boxes, thin vertical dividers */}
      <div className="mt-6 flex items-start gap-0">

        <div className="flex-1">
          <p className="art-label mb-2">Liquid Pool</p>
          <p
            className="text-xl font-light tabular-nums"
            style={{ color: 'hsl(217, 80%, 56%)', fontVariantNumeric: 'tabular-nums' }}
          >
            ${liquidBalance.toFixed(2)}
          </p>
          <p className="mt-1 text-[10px] text-foreground/25">
            {liquidRatio.toFixed(0)}% · instant access
          </p>
        </div>

        <div className="art-divider-v mx-8" />

        <div className="flex-1">
          <p className="art-label mb-2">Strategy Pool</p>
          <p
            className="text-xl font-light tabular-nums"
            style={{ color: 'hsl(325, 90%, 65%)', fontVariantNumeric: 'tabular-nums' }}
          >
            ${strategyPool.toFixed(2)}
          </p>
          <p className="mt-1 text-[10px] text-foreground/25">
            {strategyRatio.toFixed(0)}% · AI deployed
          </p>
        </div>

        <div className="art-divider-v mx-8" />

        <div className="flex-1">
          <p className="art-label mb-2">Daily Yield</p>
          <p
            className="text-xl font-semibold tabular-nums"
            style={{ color: 'hsl(325, 90%, 65%)', fontVariantNumeric: 'tabular-nums' }}
          >
            +${formatRate(dailyEarnRate)}
          </p>
          <p className="mt-1 text-[10px] text-foreground/25">principal protected</p>
        </div>

      </div>
    </div>
  );
}
