export interface PortfolioSummary {
  totalPrincipal?: string;
  totalYield?: string;
  perSecondEarnRate?: string;
  availableToSpend?: string;
  liquidBalance?: string;
  strategyPool?: string;
  dailyEarnRate?: string;
}

export interface AgentStatusItem {
  strategy: string;
  status?: string;
  apy?: number;
  nextRunInMinutes?: number;
}

export interface TransferHistoryItem {
  _id?: string;
  id?: string;
  type: string;
  amount: string;
  createdAt: string;
}
