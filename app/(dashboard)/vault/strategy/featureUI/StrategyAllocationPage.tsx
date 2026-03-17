'use client';

import { useStrategyAllocation } from '../featureService/useStrategyAllocation';
import type { LaneAllocation } from '../featureService/useStrategyAllocation';

type LaneKey = 'lane1' | 'lane2' | 'lane3';

const LANE_META: Record<LaneKey, { displayName: string }> = {
  lane1: { displayName: 'Lane 1 — Fixed Advance' },
  lane2: { displayName: 'Lane 2 — Leveraged Fixed' },
  lane3: { displayName: 'Lane 3 — Yield Streaming' },
};

const LANE_PRESETS: Array<{ label: string; allocation: LaneAllocation }> = [
  { label: 'Conservative', allocation: { lane1: 60, lane2: 30, lane3: 10 } },
  { label: 'Balanced',     allocation: { lane1: 34, lane2: 33, lane3: 33 } },
  { label: 'Aggressive',   allocation: { lane1: 10, lane2: 60, lane3: 30 } },
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

  const isValid = Math.abs(total - 100) <= 1;

  return (
    <div className="mx-auto max-w-3xl space-y-16">

      {/* Page identity */}
      <div>
        <p className="art-label mb-3">Allocation</p>
        <h1 className="text-4xl font-light text-foreground/90" style={{ letterSpacing: '-0.02em' }}>
          Choose Your Lane
        </h1>
        <p className="mt-2 text-sm text-foreground/40">
          How should capital route across the three yield lanes?
        </p>
      </div>

      {/* Preset pills */}
      <div className="flex flex-wrap gap-2">
        {LANE_PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => setAllocation(preset.allocation)}
            className="rounded-lg border border-foreground/10 px-4 py-2 text-sm text-foreground/50 transition-colors hover:border-foreground/20 hover:text-foreground/80"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Lane sliders — no colored containers */}
      <div className="space-y-0">
        {(['lane1', 'lane2', 'lane3'] as LaneKey[]).map((id) => {
          const lane = lanes?.find((e) => e.id === id);
          const meta = LANE_META[id];

          return (
            <div key={id} className="art-row items-start py-6">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground/85 mb-1">{meta.displayName}</p>
                {lane && (
                  <p className="text-[11px] text-foreground/35 mb-3">{lane.description}</p>
                )}
                {lane && (
                  <p className="text-[10px] text-foreground/25">
                    Risk: {lane.riskLevel} · Spend: {lane.spendAccess}
                  </p>
                )}
              </div>

              <div className="pl-8 w-64">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-foreground/35">Allocation</p>
                  <p className="text-xl font-light text-foreground/80 tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {allocation[id]}%
                  </p>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={allocation[id]}
                  onChange={(e) => updateAllocation(id, Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: 'hsl(217, 80%, 56%)' }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Total + confirm */}
      <div className="flex items-center justify-between pt-4">
        <div>
          <p className={`text-sm ${isValid ? 'text-foreground/60' : 'text-foreground/40'}`}>
            Total: {total}%
            {!isValid && <span className="ml-2 text-foreground/40">— must equal 100%</span>}
          </p>
          {isValid && blendedApy > 0 && (
            <p className="mt-1 text-xs text-foreground/35">
              Expected blended APY: {blendedApy.toFixed(1)}%
            </p>
          )}
        </div>

        {/* Blue CTA — only accent on this page */}
        <button
          onClick={confirmAllocation}
          disabled={loading || !isValid}
          className="premium-btn-primary px-6 py-3"
        >
          {loading ? 'Setting…' : 'Confirm Lanes →'}
        </button>
      </div>
    </div>
  );
}
