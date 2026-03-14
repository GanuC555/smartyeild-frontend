'use client';
import { create } from 'zustand';

interface AppStore {
  accessToken: string | null;
  user: any | null;
  walletAddress: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: any, address: string) => void;
  clearAuth: () => void;

  portfolio: any | null;
  setPortfolio: (p: any) => void;

  recentDecisions: any[];
  addDecision: (d: any) => void;
}

export const useStore = create<AppStore>((set) => ({
  accessToken:
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,
  user: null,
  walletAddress:
    typeof window !== 'undefined'
      ? localStorage.getItem('walletAddress')
      : null,
  isAuthenticated:
    typeof window !== 'undefined' ? !!localStorage.getItem('accessToken') : false,

  setAuth: (token, user, address) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('walletAddress', address);
    }
    import('./api/client').then(({ api }) => api.setToken(token));
    set({ accessToken: token, user, walletAddress: address, isAuthenticated: true });
  },

  clearAuth: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('walletAddress');
    }
    import('./api/client').then(({ api }) => api.clearToken());
    set({ accessToken: null, user: null, walletAddress: null, isAuthenticated: false });
  },

  portfolio: null,
  setPortfolio: (p) => set({ portfolio: p }),

  recentDecisions: [],
  addDecision: (d) =>
    set((s) => ({ recentDecisions: [d, ...s.recentDecisions].slice(0, 20) })),
}));
