'use client';

import { useEffect, useRef, useState } from 'react';

export default function YieldCounter({
  initialYield,
  perSecondRate,
}: {
  initialYield: number;
  perSecondRate: number;
}) {
  const [current, setCurrent] = useState(initialYield);
  const startRef = useRef(Date.now());
  const initRef = useRef(initialYield);

  useEffect(() => {
    initRef.current = initialYield;
    startRef.current = Date.now();
    setCurrent(initialYield);
    if (perSecondRate <= 0) return;
    const id = setInterval(() => {
      const elapsed = (Date.now() - startRef.current) / 1000;
      setCurrent(initRef.current + elapsed * perSecondRate);
    }, 100);
    return () => clearInterval(id);
  }, [initialYield, perSecondRate]);

  const formatYield = (n: number) => {
    if (n >= 1) return n.toFixed(4);
    if (n >= 0.0001) return n.toFixed(6);
    return n.toFixed(8);
  };

  const formatRate = (n: number) => {
    if (n >= 0.01) return n.toFixed(6);
    return n.toFixed(10);
  };

  return (
    <div>
      <p
        className="text-3xl font-semibold tabular-nums"
        style={{ fontVariantNumeric: 'tabular-nums', color: 'hsl(325, 90%, 65%)' }}
      >
        ${formatYield(current)}
      </p>
      {perSecondRate > 0 ? (
        <div className="mt-1.5 flex items-center gap-1.5">
          <span
            className="relative inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full pulse-dot-pink"
            style={{ background: 'hsl(325, 90%, 65%)' }}
          />
          <p className="text-[11px] text-foreground/40 tabular-nums">
            +${formatRate(perSecondRate)}/sec
          </p>
        </div>
      ) : (
        <p className="mt-1 text-[11px] text-foreground/30">Accruing…</p>
      )}
    </div>
  );
}
