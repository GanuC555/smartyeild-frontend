'use client';

import { createContext, useContext } from 'react';
import { walletAdapter, type IWalletAdapter } from './wallet-adapter';

const WalletContext = createContext<IWalletAdapter>(walletAdapter);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return <WalletContext.Provider value={walletAdapter}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  return useContext(WalletContext);
}
