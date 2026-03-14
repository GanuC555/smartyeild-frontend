The strategy allocation page is shown after a deposit, letting users choose how AI agents should split their strategy pool between Guardian, Balancer, and Hunter strategies.

- Shows each strategy's current APY, description, and approved protocols
- Range sliders auto-rebalance other strategies to keep total at 100%
- Preset buttons for common allocations (Full Safety, Balanced, Conservative, Max Yield)
- Computes and shows expected blended APY in real time
- Confirms via POST /strategies/allocate and redirects to /dashboard
- Allocation must sum to 100% — submit button is disabled otherwise
