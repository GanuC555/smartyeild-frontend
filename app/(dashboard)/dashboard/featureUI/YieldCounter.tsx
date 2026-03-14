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

    const id = setInterval(() => {
      const elapsed = (Date.now() - startRef.current) / 1000;
      setCurrent(initRef.current + elapsed * perSecondRate);
    }, 100);

    return () => clearInterval(id);
  }, [initialYield, perSecondRate]);

  return (
    <div>
      <p className="text-3xl font-bold text-teal-400">
        ${current.toLocaleString('en-US', {
          minimumFractionDigits: 6,
          maximumFractionDigits: 6,
        })}
      </p>
      <p className="mt-1 text-xs text-white/40">+${perSecondRate.toFixed(8)}/sec</p>
    </div>
  );
}
