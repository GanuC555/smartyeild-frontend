const STYLE: Record<string, string> = {
  guardian: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  balancer: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  hunter: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
};

export function StrategyBadge({ strategy }: { strategy: string }) {
  const key = strategy.toLowerCase();
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${STYLE[key] || 'bg-white/10 text-white/70 border-white/20'}`}>
      {strategy}
    </span>
  );
}
