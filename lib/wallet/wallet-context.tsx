'use client';

import { createContext, useContext, useMemo } from 'react';
import { useCurrentAccount, useSignPersonalMessage } from '@onelabs/dapp-kit';
import type { IWalletAdapter } from './wallet-adapter';

const WalletContext = createContext<IWalletAdapter>({
  connect: async () => '',
  disconnect: async () => {},
  signMessage: async () => '',
  getAddress: () => null,
  isConnected: () => false,
});

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const account = useCurrentAccount();
  const { mutateAsync: signPersonalMessage } = useSignPersonalMessage();

  const walletAddress = account?.address ?? null;
  const connected = !!account;

  const adapter = useMemo<IWalletAdapter>(
    () => ({
      async connect(): Promise<string> {
        // Connection is handled by dapp-kit's ConnectButton — no-op here
        return walletAddress ?? '';
      },
      async disconnect(): Promise<void> {
        // Disconnection is handled by dapp-kit — no-op here
      },
      async signMessage(message: string): Promise<string> {
        if (!account) throw new Error('Wallet not connected');
        const result = await signPersonalMessage({
          message: new TextEncoder().encode(message),
        });
        return result.signature;
      },
      getAddress() {
        return walletAddress;
      },
      isConnected() {
        return connected;
      },
    }),
    [walletAddress, connected, account, signPersonalMessage],
  );

  return (
    <WalletContext.Provider value={adapter}>{children}</WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
