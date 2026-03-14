'use client';

import {
  STRATEGY_META,
  STRATEGY_PRESETS,
} from '../constants/strategy-allocation.constants';
import { useStrategyAllocation } from '../featureService/useStrategyAllocation';
import type { StrategyKey } from '../types/strategy-allocation.types';

export default function StrategyAllocationPage() {
  const {
    allocation,
    blendedApy,
    confirmAllocation,
    loading,
    setAllocation,
    strategies,
    total,
    updateAllocation,
  } = useStrategyAllocation();

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Choose Your Strategy</h1>
        <p className="mt-2 text-white/50">How should AI agents allocate your strategy pool?</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {STRATEGY_PRESETS.map((preset) => (
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
        {(['guardian', 'balancer', 'hunter'] as StrategyKey[]).map((id) => {
          const strategy = strategies?.find((entry) => entry.id === id);
          const meta = STRATEGY_META[id];

          if (!strategy) {
            return (
              <div key={id} className={`${meta.bg} rounded-2xl border ${meta.border} p-6`}>
                <h3 className="text-lg font-bold capitalize text-white">{id}</h3>
                <p className="mt-2 text-sm text-white/40">Loading strategy metadata…</p>
              </div>
            );
          }

          return (
            <div key={id} className={`${meta.bg} rounded-2xl border ${meta.border} p-6`}>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {strategy.emoji} {strategy.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/50">{strategy.description}</p>
                  <p className={`${meta.text} mt-2 text-sm`}>
                    Target: {strategy.targetAPYMin}–{strategy.targetAPYMax}% APY • Current:{' '}
                    {strategy.currentAPY}%
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

              <div className="mt-3">
                <p className="mb-1 text-xs text-white/30">Approved protocols:</p>
                <div className="flex flex-wrap gap-2">
                  {strategy.protocols.map((protocol) => (
                    <span
                      key={protocol.name}
                      className="rounded-lg bg-white/10 px-2 py-1 text-xs text-white/50"
                    >
                      {protocol.name}
                    </span>
                  ))}
                </div>
              </div>
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
          {loading ? 'Setting…' : 'Confirm Strategy →'}
        </button>
      </div>
    </div>
  );
}
