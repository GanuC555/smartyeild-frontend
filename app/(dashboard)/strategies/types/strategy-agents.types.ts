export interface AgentDecision {
  decision?: string;
  reasoning?: string;
}

export interface AgentRecord {
  strategy: string;
  lastRunAt?: string;
  lastDecision?: AgentDecision;
}
