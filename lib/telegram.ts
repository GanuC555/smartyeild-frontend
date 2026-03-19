'use client';

// Type-safe wrapper around the Telegram Mini App WebApp API.
// Only available when the page is opened inside Telegram (via Mini App button).
// In a regular browser, getTelegramWebApp() returns null — all callers must guard for this.

export type TwaMainButton = {
  text: string;
  isVisible: boolean;
  isActive: boolean;
  setText(text: string): TwaMainButton;
  onClick(fn: () => void): TwaMainButton;
  offClick(fn: () => void): TwaMainButton;
  show(): TwaMainButton;
  hide(): TwaMainButton;
  enable(): TwaMainButton;
  disable(): TwaMainButton;
  showProgress(leaveActive?: boolean): TwaMainButton;
  hideProgress(): TwaMainButton;
};

export type TwaBackButton = {
  isVisible: boolean;
  onClick(fn: () => void): TwaBackButton;
  offClick(fn: () => void): TwaBackButton;
  show(): TwaBackButton;
  hide(): TwaBackButton;
};

export type TelegramWebApp = {
  ready(): void;
  expand(): void;
  close(): void;
  isExpanded: boolean;
  colorScheme: 'light' | 'dark';
  initData: string;
  initDataUnsafe: {
    user?: { id: number; first_name: string; last_name?: string; username?: string };
  };
  MainButton: TwaMainButton;
  BackButton: TwaBackButton;
};

export function getTelegramWebApp(): TelegramWebApp | null {
  if (typeof window === 'undefined') return null;
  return (window as any).Telegram?.WebApp ?? null;
}

/** True only when the page is running inside a Telegram Mini App. */
export function isTelegramMiniApp(): boolean {
  const twa = getTelegramWebApp();
  return !!(twa?.initData && twa.initData.length > 0);
}
