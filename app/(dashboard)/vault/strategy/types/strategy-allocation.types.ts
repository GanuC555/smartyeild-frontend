export type StrategyKey = 'guardian' | 'balancer' | 'hunter';

export interface StrategyProtocol {
  name: string;
}

export interface StrategyItem {
  id: StrategyKey;
  emoji: string;
  name: string;
  description: string;
  targetAPYMin: number;
  targetAPYMax: number;
  currentAPY: number;
  protocols: StrategyProtocol[];
}

export interface StrategyAllocation {
  guardian: number;
  balancer: number;
  hunter: number;
}
