The spend page is the primary real-world spending interface. It shows the user's
SpendBuffer balance (yield + advance) and allows QR Pay and P2P transfers.

- Shows total spendable balance with yield vs advance breakdown
- QR Pay button opens modal: enter recipient address, amount, optional note
- Settlement draws from yield first, advance second, never touches strategy positions
- Transaction history shows all QR pays and P2P transfers with settlement source
- Card button shown as coming soon (Baanx integration is secondary)
- Data via useSpend hook calling /spend/balance and /spend/history
