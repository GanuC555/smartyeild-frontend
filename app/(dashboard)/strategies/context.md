The strategies page shows the three AI agents (Guardian, Balancer, Hunter) and lets users see their last decision, reasoning, and manually trigger a run.

- Fetches agent status from GET /agents every 30s
- Each card shows: strategy badge, last run time, last decision text, reasoning excerpt
- Trigger run button calls POST /agents/:strategy/run
- Run button is disabled while that strategy is actively running
- Falls back gracefully if the backend run endpoint isn't available yet
