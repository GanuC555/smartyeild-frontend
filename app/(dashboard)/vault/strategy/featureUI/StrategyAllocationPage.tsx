'use client';

import { useStrategyAllocation } from '../featureService/useStrategyAllocation';
import type { LaneAllocation } from '../featureService/useStrategyAllocation';

type LaneKey = 'lane1' | 'lane2' | 'lane3';

const LANE_META: Record<LaneKey, { bg: string; border: string; text: string; displayName: string }> = {
  lane1: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    displayName: 'Lane 1 — Fixed Advance',
  },
  lane2: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    displayName: 'Lane 2 — Leveraged Fixed',
  },
  lane3: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    displayName: 'Lane 3 — Yield Streaming',
  },
};

const LANE_PRESETS: Array<{ label: string; allocation: LaneAllocation }> = [
  {
    label: 'Conservative',
    allocation: { lane1: 60, lane2: 30, lane3: 10 },
  },
  {
    label: 'Balanced',
    allocation: { lane1: 34, lane2: 33, lane3: 33 },
  },
  {
    label: 'Aggressive',
    allocation: { lane1: 10, lane2: 60, lane3: 30 },
  },
];

export default function StrategyAllocationPage() {
  const {
    allocation,
    blendedApy,
    confirmAllocation,
    loading,
    setAllocation,
    lanes,
    total,
    updateAllocation,
  } = useStrategyAllocation();

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Choose Your Lane</h1>
        <p className="mt-2 text-white/50">How should capital route across the three yield lanes?</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {LANE_PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => setAllocation(preset.allocation)}
            className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white/60 transition-colors hover:bg-white/20 hover:text-white"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {(['lane1', 'lane2', 'lane3'] as LaneKey[]).map((id) => {
          const lane = lanes?.find((entry) => entry.id === id);
          const meta = LANE_META[id];

          if (!lane) {
            return (
              <div key={id} className={`${meta.bg} rounded-2xl border ${meta.border} p-6`}>
                <h3 className="text-lg font-bold text-white">{meta.displayName}</h3>
                <p className="mt-2 text-sm text-white/40">Loading lane metadata…</p>
              </div>
            );
          }

          return (
            <div key={id} className={`${meta.bg} rounded-2xl border ${meta.border} p-6`}>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{meta.displayName}</h3>
                  <p className="mt-1 text-sm text-white/50">{lane.description}</p>
                  <p className={`${meta.text} mt-2 text-sm`}>
                    Risk: {lane.riskLevel} · Spend access: {lane.spendAccess}
                  </p>
                </div>
                <p className="text-2xl font-bold text-white">{allocation[id]}%</p>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={allocation[id]}
                onChange={(event) => updateAllocation(id, Number(event.target.value))}
                className="w-full accent-teal-400"
              />
            </div>
          );
        })}
      </div>

      <div
        className={`flex items-center justify-between rounded-xl border p-4 ${
          Math.abs(total - 100) > 1
            ? 'border-red-500/30 bg-red-500/10'
            : 'border-teal-500/30 bg-teal-500/10'
        }`}
      >
        <div>
          <p className={Math.abs(total - 100) > 1 ? 'text-red-400' : 'text-teal-400'}>
            Total: {total}% {Math.abs(total - 100) > 1 ? '⚠️ Must equal 100%' : '✓'}
          </p>
          {Math.abs(total - 100) <= 1 ? (
            <p className="mt-1 text-sm text-white/50">
              Expected blended APY: {blendedApy.toFixed(1)}%
            </p>
          ) : null}
        </div>

        <button
          onClick={confirmAllocation}
          disabled={loading || Math.abs(total - 100) > 1}
          className="rounded-xl bg-teal-500 px-6 py-3 font-bold text-black transition-colors hover:bg-teal-400 disabled:opacity-50"
        >
          {loading ? 'Setting…' : 'Confirm Lanes →'}
        </button>
      </div>
    </div>
  );
}
