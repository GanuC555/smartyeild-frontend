'use client';
import { useEffect } from 'react';
import { getTelegramWebApp, isTelegramMiniApp } from '@/lib/telegram';
import { api } from '@/lib/api/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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
        const res = await fetch(`${API_URL}/auth/telegram-mini-app`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ initData: twa.initData }),
        });
        if (res.ok) {
          const { accessToken } = await res.json();
          api.setToken(accessToken);
        } else {
          // Not linked yet — user will see link instructions from bot
          console.warn('[TelegramInit] Mini App auth failed:', await res.text());
        }
      } catch (e) {
        console.warn('[TelegramInit] Mini App auth error:', e);
      }
    })();
  }, []);

  return null;
}
