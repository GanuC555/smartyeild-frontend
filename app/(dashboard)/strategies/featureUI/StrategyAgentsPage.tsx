'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StrategyBadge } from '@/components/ui/strategy-badge';
import { STRATEGY_KEYS } from '../constants/strategy-agents.constants';
import { useStrategyAgents } from '../featureService/useStrategyAgents';

export default function StrategyAgentsPage() {
  const { agents, isLoading, running, triggerRun } = useStrategyAgents();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">AI Strategy Agents</h1>
        <p className="mt-2 text-white/50">
          Each agent manages only its strategy allocation inside whitelist limits.
        </p>
      </div>

      {isLoading ? (
        <p className="text-white/40">Loading agents…</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {STRATEGY_KEYS.map((strategy) => {
            const item = agents.find((agent) => agent.strategy === strategy);
            return (
              <Card key={strategy} className="space-y-4">
                <div className="flex items-center justify-between">
                  <StrategyBadge strategy={strategy} />
                  <span className="text-xs text-white/40">
                    {item?.lastRunAt
                      ? new Date(item.lastRunAt).toLocaleString()
                      : 'Never run'}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-white/60">Last action</p>
                  <p className="text-white">{item?.lastDecision?.decision || 'No decisions yet'}</p>
                </div>

                <div>
                  <p className="text-sm text-white/60">Reasoning</p>
                  <p className="line-clamp-4 text-sm text-white/80">
                    {item?.lastDecision?.reasoning ||
                      'No stored reasoning yet for this strategy.'}
                  </p>
                </div>

                <Button
                  variant="secondary"
                  className="w-full"
                  disabled={running === strategy}
                  onClick={() => triggerRun(strategy)}
                >
                  {running === strategy ? 'Running…' : 'Trigger run'}
                </Button>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
