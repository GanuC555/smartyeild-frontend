import type { LandingStrategyCard } from '../types/landing.types';

export const LANDING_STRATEGIES: LandingStrategyCard[] = [
  {
    key: 'guardian',
    title: 'The Guardian',
    apy: '5–8% APY',
    description: 'T-bill style and stable lending focus for principal safety.',
  },
  {
    key: 'balancer',
    title: 'The Balancer',
    apy: '10–15% APY',
    description: 'RWA floor + stable LP allocation for stronger low-volatility yield.',
  },
  {
    key: 'hunter',
    title: 'The Hunter',
    apy: '20–35%+ APY',
    description: 'Aggressive LP + prediction-market allocation for max upside.',
  },
];
