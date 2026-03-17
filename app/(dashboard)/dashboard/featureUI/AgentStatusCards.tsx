const STRATEGY_META: Record<string, { label: string; description: string }> = {
  guardian: { label: 'Guardian', description: 'Risk management & capital protection' },
  balancer: { label: 'Balancer', description: 'Pool rebalancing & liquidity optimization' },
  hunter:   { label: 'Hunter',   description: 'Yield opportunity scanning' },
};

function statusDotColor(status?: string): string {
  if (!status || status === 'idle') return 'rgba(255,255,255,0.2)';
  if (status === 'running' || status === 'active') return 'hsl(217, 80%, 56%)';
  return 'hsl(325, 90%, 65%)';
}

export default function AgentStatusCards({
  agents,
}: {
  agents: Array<{ strategy: string; status?: string; apy?: number; nextRunInMinutes?: number }>;
}) {
  const strategies = ['guardian', 'balancer', 'hunter'];

  return (
    <div>
      <p className="art-label mb-6">AI Agents</p>

      <div>
        {strategies.map((strategy) => {
          const item = agents.find((a) => a.strategy === strategy);
          const meta = STRATEGY_META[strategy];
          const dot = statusDotColor(item?.status);

          return (
            <div key={strategy} className="art-row">
              {/* Left: status dot + name + description */}
              <div className="flex items-center gap-3">
                <span
                  className="h-2 w-2 flex-shrink-0 rounded-full"
                  style={{
                    background: dot,
                    boxShadow: dot !== 'rgba(255,255,255,0.2)' ? `0 0 6px ${dot}` : 'none',
                  }}
                />
                <div>
                  <p className="text-sm font-medium text-foreground/85">{meta.label}</p>
                  <p className="text-[11px] text-foreground/35">{meta.description}</p>
                </div>
              </div>

              {/* Right: APY + next run — solid blue only */}
              <div className="text-right">
                <p
                  className="text-sm font-semibold tabular-nums"
                  style={{
                    color: item?.apy ? 'hsl(217, 80%, 56%)' : 'rgba(255,255,255,0.3)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {item?.apy ?? 0}% APY
                </p>
                <p className="text-[11px] text-foreground/30 tabular-nums">
                  {item?.nextRunInMinutes ? `${item.nextRunInMinutes}m` : 'standby'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
