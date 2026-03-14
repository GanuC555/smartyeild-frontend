'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SuiClientProvider, WalletProvider } from '@onelabs/dapp-kit';
import { Toaster } from 'sonner';
import { WalletProvider as StubWalletProvider } from '@/lib/wallet/wallet-context';
import { ONECHAIN_CONFIG } from '@/lib/onechain/onechain.config';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

const networks = {
  testnet: { url: ONECHAIN_CONFIG.rpcUrl },
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="testnet">
        <WalletProvider autoConnect>
          <StubWalletProvider>
            {children}
            <Toaster position="top-right" theme="dark" richColors />
          </StubWalletProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
