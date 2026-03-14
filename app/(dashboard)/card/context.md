The card page lets users manage their virtual yield card — the spending layer of the protocol. Users can issue a virtual card, freeze or unfreeze it, and see their recent card transactions.

- Issues a virtual card via POST /card/issue
- Toggles freeze/unfreeze state
- Shows recent card purchase history (up to 10 items)
- Card endpoints gracefully fall back to demo mode if backend is unavailable
- Card status and transactions polled via TanStack Query
