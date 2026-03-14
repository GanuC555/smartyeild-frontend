import type { StrategyAllocation, StrategyKey } from '../types/strategy-allocation.types';

export const STRATEGY_META: Record<
  StrategyKey,
  { bg: string; border: string; text: string }
> = {
  guardian: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
  },
  balancer: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
  },
  hunter: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
  },
};

export const STRATEGY_PRESETS: Array<{
  label: string;
  allocation: StrategyAllocation;
}> = [
  {
    label: '🛡️ Full Safety',
    allocation: { guardian: 100, balancer: 0, hunter: 0 },
  },
  {
    label: '⚖️ Balanced',
    allocation: { guardian: 34, balancer: 33, hunter: 33 },
  },
  {
    label: '🔵 Conservative',
    allocation: { guardian: 70, balancer: 30, hunter: 0 },
  },
  {
    label: '🎯 Max Yield',
    allocation: { guardian: 0, balancer: 0, hunter: 100 },
  },
];
