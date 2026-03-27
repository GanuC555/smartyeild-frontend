'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { useWallet } from '@/lib/wallet/wallet-context';
import { useStore } from '@/lib/store';

const NAV_ITEMS = [
  { href: '/', label: 'Landing' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/vault', label: 'Vault' },
  { href: '/strategies', label: 'Lanes' },
  { href: '/spend', label: 'Spend' },
  { href: '/card', label: 'Card' },
  { href: '/history', label: 'History' },
  { href: '/settings', label: 'Settings' },
];

function truncateAddress(address: string) {
  return address ? `${address.slice(0, 6)}…${address.slice(-4)}` : '';
}

function isNavItemActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

export default function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const wallet = useWallet();
  const { walletAddress, clearAuth } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const onDisconnect = async () => {
    await wallet.disconnect();
    clearAuth();
    router.push('/');
  };

  return (
    <header className="forum-regular fixed left-0 right-0 top-0 z-50 px-4 py-4 md:px-8">
      <div className=" mx-auto max-w-7xl px-4 py-3 md:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/10 backdrop-blur-sm">
           <Image src="/LogoOYS.png" alt="OneYield Logo" width={32} height={16} className="h-5 w-6" />
            </div>
            <span className="forum-regular text-lg font-semibold  text-foreground/90">
              OneYield
            </span>
          </Link>

          <nav className="hidden md:block">
            <div className="backdrop-blur-sm border border-foreground/10  rounded-full flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    isNavItemActive(pathname, item.href)
                      ? 'bg-foreground/10 text-foreground/95'
                      : 'text-foreground/60 hover:text-foreground/90'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="hidden items-center gap-3 md:flex ">
            <span className="backdrop-blur-sm rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 font-mono text-xs text-foreground/60">
              {truncateAddress(walletAddress || '')}
            </span>
            <button
              onClick={onDisconnect}
              className="backdrop-blur-sm rounded-full border border-foreground/10 px-3 py-1 text-md text-foreground/55 transition-colors hover:bg-foreground/5 hover:text-foreground/80"
            >
              Disconnect
            </button>
          </div>

          <button
            onClick={() => setMobileOpen((value) => !value)}
            className="flex p-2 md:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5 text-foreground/80" />
            ) : (
              <Menu className="h-5 w-5 text-foreground/80" />
            )}
          </button>
        </div>

        {mobileOpen ? (
          <div className="glass-card mt-4 overflow-hidden rounded-2xl md:hidden">
            <div className="flex flex-col gap-1 p-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm transition-colors ${
                    isNavItemActive(pathname, item.href)
                      ? 'bg-foreground/10 text-foreground/95'
                      : 'text-foreground/65 hover:bg-foreground/5 hover:text-foreground/90'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 space-y-2">
                <div className="rounded-xl border border-foreground/10 bg-foreground/5 px-3 py-2 font-mono text-xs text-foreground/60">
                  {truncateAddress(walletAddress || '') || 'Wallet not connected'}
                </div>
                <button
                  onClick={onDisconnect}
                  className="w-full rounded-xl border border-foreground/10 px-4 py-2 text-sm text-foreground/70 transition-colors hover:bg-foreground/5"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
