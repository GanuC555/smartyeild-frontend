'use client';
import { motion } from 'framer-motion';
import { useStrategyAgents } from '../featureService/useStrategyAgents';

const LANE_COLORS: Record<string, string> = {
  lane1: 'border-blue-500/30 bg-blue-500/5',
  lane2: 'border-purple-500/30 bg-purple-500/5',
  lane3: 'border-amber-500/30 bg-amber-500/5',
};

export default function StrategyAgentsPage() {
  const { lanes, isLoading, running, triggerLane, lane1Decisions, lane2Decisions, lane3Decisions } = useStrategyAgents();

  const allDecisions = [
    ...(lane1Decisions ?? []),
    ...(lane2Decisions ?? []),
    ...(lane3Decisions ?? []),
  ].sort((a: any, b: any) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()).slice(0, 10);

  const getLaneAPY = (lane: any) => {
    if (lane.id === 'lane1') return lane.targetAPY ?? `${lane.spread?.toFixed(1) ?? '—'}% spread`;
    if (lane.id === 'lane2') return lane.estimatedAPY ?? `${(lane.impliedAPY * 5)?.toFixed(1) ?? '—'}% est.`;
    if (lane.id === 'lane3') return `${lane.ytImpliedAPY?.toFixed(1) ?? lane.srNusdAPY?.toFixed(1) ?? '—'}% YT`;
    return '—';
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[0, 1, 2].map(i => (
          <div key={i} className="h-32 rounded-2xl bg-foreground/5 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light tracking-tight">Yield Lanes</h1>
        <p className="text-sm text-foreground/40 mt-1">Protocol-native yield routing via Strata → Pendle → Morpho</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {lanes.map((lane, i) => (
          <motion.div
            key={lane.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`rounded-2xl border p-5 ${LANE_COLORS[lane.id] ?? 'border-foreground/10'}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-foreground/40 uppercase tracking-wider">{lane.id.toUpperCase()}</p>
                <h3 className="text-base font-medium mt-0.5">{lane.name}</h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full border border-foreground/10 text-foreground/50">
                {lane.riskLevel}
              </span>
            </div>
            <p className="text-sm text-foreground/50 mb-4">{lane.description}</p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-light">{getLaneAPY(lane)}</p>
                <p className="text-xs text-foreground/30 mt-0.5">Spend: {lane.spendAccess}</p>
              </div>
              <button
                onClick={() => triggerLane(lane.id)}
                disabled={running === lane.id}
                className="text-xs px-3 py-1.5 border border-foreground/10 rounded-lg hover:bg-foreground/5 disabled:opacity-40"
              >
                {running === lane.id ? 'Running...' : 'Trigger'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div>
        <h2 className="text-base font-medium mb-4">Decision Feed</h2>
        {allDecisions.length === 0 && (
          <p className="text-sm text-foreground/30">No decisions yet. Trigger a lane to generate the first decision.</p>
        )}
        <div className="space-y-3">
          {allDecisions.map((d: any, i) => (
            <motion.div
              key={d._id || i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-xl border border-foreground/5 bg-foreground/3 p-4"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-foreground/60 uppercase">{d.lane} · {d.trigger}</span>
                <span className="text-xs text-foreground/30">{d.riskAssessment}</span>
              </div>
              <p className="text-sm text-foreground/70">{d.reasoning}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
