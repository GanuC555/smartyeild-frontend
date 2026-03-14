'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useWallet } from '@/lib/wallet/wallet-context';
import { useStore } from '@/lib/store';

const NAV_ITEMS = [
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

export default function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const wallet = useWallet();
  const { walletAddress, clearAuth } = useStore();

  const onDisconnect = async () => {
    await wallet.disconnect();
    clearAuth();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 px-6 py-4 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/dashboard" className="text-lg font-bold text-white">
          OneYield<span className="text-teal-400">&Spend</span>
        </Link>

        <nav className="hidden gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${
                pathname?.startsWith(item.href)
                  ? 'font-medium text-white'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-white/50">
            {truncateAddress(walletAddress || '')}
          </span>
          <button
            onClick={onDisconnect}
            className="text-xs text-white/30 transition-colors hover:text-white/60"
          >
            Disconnect
          </button>
        </div>
      </div>
    </header>
  );
}
