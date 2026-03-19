'use client';
import { useEffect } from 'react';
import { getTelegramWebApp, isTelegramMiniApp } from '@/lib/telegram';
import { api } from '@/lib/api/client';

/**
 * Initialises the Telegram Mini App SDK when the page is opened inside Telegram.
 * - Calls WebApp.ready()  → hides Telegram's native loading spinner
 * - Calls WebApp.expand() → forces full-screen height
 * - Silently authenticates the user via Telegram initData so all API calls work
 *   without requiring the user to connect their wallet again.
 * Safe to render in every layout — is a no-op in a regular browser.
 */
export function TelegramInit() {
  useEffect(() => {
    const twa = getTelegramWebApp();
    if (!twa) return;

    twa.ready();
    twa.expand();

    if (!isTelegramMiniApp()) return;

    // Silent auth: exchange Telegram initData for a JWT so all API calls work
    (async () => {
      try {
        const { accessToken } = await api.post<{ accessToken: string }>(
          '/auth/telegram-mini-app',
          { initData: twa.initData },
        );
        api.setToken(accessToken);
      } catch (e) {
        // Not linked yet — user will see link instructions from bot
        console.warn('[TelegramInit] Mini App auth error:', e);
      }
    })();
  }, []);

  return null;
}
