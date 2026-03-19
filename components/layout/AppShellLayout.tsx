'use client';

import AuroraBackground from '@/components/ui/aurora-background';
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
    <div className="relative min-h-screen bg-black text-foreground">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-55">
        <AuroraBackground
          className="!h-full !w-full !items-start !justify-start"
          starCount={70}
          pulseDuration={10}
          gradientColors={[
            'var(--aurora-color1, rgba(99,102,241,0.2))',
            'var(--aurora-color2, rgba(139,92,246,0.2))',
          ]}
          ariaLabel="Dashboard aurora background"
        />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-black/35" />
      <AppHeader />
      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-8 pt-28 md:px-6 md:pt-32">
        {children}
      </main>
    </div>
  );
}
