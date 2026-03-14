The lane selector appears after deposit. User chooses how to split capital across 3 lanes.
Each lane uses Strata → Pendle → Morpho in a different configuration.

- Three lane cards show: name, protocol stack, target APY, risk level, spend access timing
- Sliders allow custom allocation; all must sum to 100% (10000 bps sent to backend)
- Three preset buttons: Conservative (60/30/10), Balanced (34/33/33), Aggressive (10/60/30)
- Live blended APY preview updates as sliders move
- Confirm calls POST /lanes/allocate and redirects to dashboard
- Data from useStrategyAllocation hook (calls /lanes)
