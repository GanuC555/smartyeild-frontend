The vault withdraw feature lets users reclaim their principal after the
30-day lock period by burning their FRT (Fixed Receipt Token) on-chain.
The Move contract enforces maturity — early attempts will be rejected.

- Calls vault::withdraw(vault, frt_coin, clock) on OneChain
- Burns all FRT the user holds; vault returns MOCK_USD principal
- Shows current position details (principal, maturity date) before confirming
- Redirects to /vault after successful withdrawal so user can deposit again
