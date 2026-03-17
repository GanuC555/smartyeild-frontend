'use client';

import { useStrategyAgents } from '../featureService/useStrategyAgents';

export default function StrategyAgentsPage() {
  const { lanes, isLoading, running, triggerLane, lane1Decisions, lane2Decisions, lane3Decisions } =
    useStrategyAgents();

  const allDecisions = [
    ...(lane1Decisions ?? []),
    ...(lane2Decisions ?? []),
    ...(lane3Decisions ?? []),
  ]
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime(),
    )
    .slice(0, 10);

  const getLaneAPY = (lane: any) => {
    if (lane.id === 'lane1') return lane.targetAPY ?? `${lane.spread?.toFixed(1) ?? '—'}% spread`;
    if (lane.id === 'lane2')
      return lane.estimatedAPY ?? `${(lane.impliedAPY * 5)?.toFixed(1) ?? '—'}% est.`;
    if (lane.id === 'lane3')
      return `${lane.ytImpliedAPY?.toFixed(1) ?? lane.srNusdAPY?.toFixed(1) ?? '—'}% YT`;
    return '—';
  };

  if (isLoading) {
    return (
      <div className="space-y-6 pt-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-24 rounded-xl bg-foreground/5 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-16">

      {/* Page identity */}
      <div>
        <p className="art-label mb-3">Lanes</p>
        <h1 className="text-4xl font-light text-foreground/90" style={{ letterSpacing: '-0.02em' }}>
          Yield Routing
        </h1>
        <p className="mt-2 text-sm text-foreground/40">
          Protocol-native yield routing via Strata → Pendle → Morpho
        </p>
      </div>

      {/* Lane list — no colored borders, just spaced rows */}
      <div className="space-y-0">
        {lanes.map((lane, i) => (
          <div key={lane.id} className={`art-row items-start py-6 ${i === 0 ? '' : ''}`}>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <p className="text-sm font-medium text-foreground/85">{lane.name}</p>
                <span className="text-[10px] text-foreground/30 tracking-widest uppercase border border-foreground/10 rounded-full px-2 py-0.5">
                  {lane.riskLevel}
                </span>
              </div>
              <p className="text-[11px] text-foreground/35 mb-2">{lane.description}</p>
              <p className="text-[11px] text-foreground/25">Spend access: {lane.spendAccess}</p>
            </div>

            <div className="flex items-center gap-6 pl-8">
              <div className="text-right">
                <p className="text-2xl font-light text-foreground/85 tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {getLaneAPY(lane)}
                </p>
                <p className="art-label mt-1">{lane.id.toUpperCase()}</p>
              </div>
              <button
                onClick={() => triggerLane(lane.id)}
                disabled={running === lane.id}
                className="rounded-lg border border-foreground/10 px-4 py-2 text-xs text-foreground/50 transition-colors hover:border-foreground/20 hover:text-foreground/80 disabled:opacity-30"
              >
                {running === lane.id ? 'Running…' : 'Trigger'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Decision feed */}
      {allDecisions.length > 0 && (
        <div>
          <p className="art-label mb-6">Decision Feed</p>
          <div>
            {allDecisions.map((d: any, i) => (
              <div key={d._id || i} className="art-row items-start py-5">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs text-foreground/50 uppercase tracking-wider">
                      {d.lane}
                    </span>
                    <span className="h-px w-3 bg-foreground/20" />
                    <span className="text-xs text-foreground/35">{d.trigger}</span>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{d.reasoning}</p>
                </div>
                <p className="pl-8 text-[11px] text-foreground/25 text-right shrink-0">
                  {d.riskAssessment}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {allDecisions.length === 0 && (
        <p className="text-sm text-foreground/30">
          No decisions yet. Trigger a lane to generate the first decision.
        </p>
      )}
    </div>
  );
}
