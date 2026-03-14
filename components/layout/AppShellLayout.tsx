'use client';

import { useAppSession } from './useAppSession';
import AppHeader from './AppHeader';

export default function AppShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAppSession();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ background: 'hsl(228,30%,4%)' }}>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}
