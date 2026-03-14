const EMOJIS: Record<string, string> = {
  guardian: '🛡️',
  balancer: '⚖️',
  hunter: '🎯',
};

export default function AgentStatusCards({
  agents,
}: {
  agents: Array<{ strategy: string; status?: string; apy?: number; nextRunInMinutes?: number }>;
}) {
  const strategies = ['guardian', 'balancer', 'hunter'];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="mb-4 font-semibold text-white">Agent Status</h3>
      <div className="space-y-3">
        {strategies.map((strategy) => {
          const item = agents.find((agent) => agent.strategy === strategy);
          return (
            <div
              key={strategy}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <p className="text-white">
                  {EMOJIS[strategy]} <span className="capitalize">{strategy}</span>
                </p>
                <p className="text-xs text-white/50">{item?.status ?? 'idle'}</p>
              </div>
              <p className="text-sm text-white/60">
                APY: <span className="text-teal-400">{item?.apy ?? 0}%</span>
              </p>
              <p className="text-sm text-white/60">
                Next run: {item?.nextRunInMinutes ?? 0}m
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
