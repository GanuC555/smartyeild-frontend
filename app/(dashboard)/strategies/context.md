The Lanes page shows the three protocol-native yield lanes and their AI decision feed.
Each lane routes capital through Strata → Pendle → Morpho using a different strategy.

- Lane 1 (Fixed Advance): PT collateral → Morpho borrow → day-1 USDC in SpendBuffer
- Lane 2 (Leveraged Fixed): PT + Morpho flash loan loop → 5x amplified fixed yield
- Lane 3 (Yield Streaming): YT held → srNUSD yield streamed to SpendBuffer daily
- Shows live protocol metrics: PT discount, YT implied APY, Morpho borrow rate
- AI decision feed shows Claude's reasoning for each lane adjustment
- Data fetched via useStrategyAgents hook (calls /lanes and /lanes/:lane/decisions)
