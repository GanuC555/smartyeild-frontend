'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { WalletProvider } from '@/lib/wallet/wallet-context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster position="top-right" theme="dark" richColors />
      </QueryClientProvider>
    </WalletProvider>
  );
}
