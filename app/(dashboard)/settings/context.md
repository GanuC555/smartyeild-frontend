The settings page lets users view their platform ID and link or unlink their Telegram account for bot notifications.

- Shows the user's platform ID from GET /users/me (used to pair with Telegram bot)
- If Telegram is not linked: shows input field + link button
- If Telegram is linked: shows linked username + unlink button
- Link/unlink via POST /telegram/link and DELETE /telegram/link
- Both endpoints fall back gracefully if backend isn't ready
