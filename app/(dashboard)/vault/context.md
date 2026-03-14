The vault page is where users deposit USDC into the protocol. It shows the current vault stats (TVL, blended APY, share price) and lets users enter an amount, preview how many OYS shares they'll receive, and confirm the deposit.

- Fetches vault metadata from GET /vaults/:id
- Shows a live deposit preview as the user types
- Quick-select buttons for common amounts (100, 500, 1000, 5000 USDC)
- On successful deposit, redirects to /vault/strategy to set allocation
- Deposit is split 50/50 between liquid balance and strategy pool
