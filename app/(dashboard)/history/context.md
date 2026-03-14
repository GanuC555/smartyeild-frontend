The history page shows a full ledger of the user's vault and transfer events — deposits, withdrawals, yield settlements, and card transactions.

- Fetches all transfer history from GET /transfer/history every 20s
- Shows transaction type, timestamp, and amount for each entry
- Handles missing IDs gracefully for row keys
- Empty state shown if no transactions exist yet
