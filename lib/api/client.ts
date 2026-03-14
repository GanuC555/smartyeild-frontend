const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiClient {
  private accessToken: string | null = null;

  setToken(token: string) {
    this.accessToken = token;
  }
  clearToken() {
    this.accessToken = null;
  }

  private async request<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(this.accessToken
          ? { Authorization: `Bearer ${this.accessToken}` }
          : {}),
        ...(options.headers as Record<string, string>),
      },
    });

    if (res.status === 401) {
      try {
        const rt =
          typeof window !== 'undefined'
            ? localStorage.getItem('refreshToken')
            : null;
        if (rt) {
          const r2 = await fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: rt }),
          });
          if (r2.ok) {
            const { accessToken } = await r2.json();
            this.setToken(accessToken);
            return this.request(path, options);
          }
        }
      } catch {}
      this.clearToken();
      if (typeof window !== 'undefined') window.location.href = '/';
      throw new Error('Unauthorized');
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(err.message || 'Request failed');
    }

    return res.json();
  }

  get<T>(path: string) {
    return this.request<T>(path);
  }
  post<T>(path: string, body?: any) {
    return this.request<T>(path, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }
  patch<T>(path: string, body?: any) {
    return this.request<T>(path, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }
  delete<T>(path: string, body?: any) {
    return this.request<T>(path, {
      method: 'DELETE',
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}

export const api = new ApiClient();

// Initialise token from localStorage on import
if (typeof window !== 'undefined') {
  const t = localStorage.getItem('accessToken');
  if (t) api.setToken(t);
}

export const authApi = {
  getNonce: (address: string) =>
    api.post<{ nonce: string }>('/auth/nonce', {
      address,
      walletAddress: address,
    }),
  verify: (address: string, signature: string) =>
    api.post<{ accessToken: string; refreshToken: string; user: any }>(
      '/auth/verify',
      { address, signature },
    ),
  refresh: (refreshToken: string) =>
    api.post<{ accessToken: string }>('/auth/refresh', { refreshToken }),
  logout: (refreshToken: string) =>
    api.delete('/auth/logout', { refreshToken }),
};

export const userApi = {
  me: () => api.get<any>('/users/me'),
  portfolio: () => api.get<any>('/users/me/portfolio'),
};

export const vaultApi = {
  list: () => api.get<any[]>('/vaults'),
  get: (id: string) => api.get<any>(`/vaults/${id}`),
  previewDeposit: (id: string, amount: string) =>
    api.post<any>(`/vaults/${id}/preview-deposit`, { amount }),
  previewWithdraw: (id: string, shares: string) =>
    api.post<any>(`/vaults/${id}/preview-withdraw`, { shares }),
  submitDeposit: (id: string, txHash: string, amount: string) =>
    api.post<any>(`/vaults/${id}/deposit`, { txHash, amount }),
  demoConfirm: (id: string, amount: string) =>
    api.post<any>(`/vaults/${id}/demo-confirm`, { amount }),
  positions: (id: string) => api.get<any[]>(`/vaults/${id}/positions`),
};

export const strategyApi = {
  list: () => api.get<any[]>('/strategies'),
  myAllocation: () => api.get<any>('/strategies/my-allocation'),
  allocate: (alloc: {
    guardian?: number;
    balancer?: number;
    hunter?: number;
  }) => api.post<any>('/strategies/allocate', alloc),
};

export const agentApi = {
  status: () => api.get<any[]>('/agents'),
  decisions: (strategy: string) =>
    api.get<any[]>(`/agents/${strategy}/decisions`),
  run: (strategy: string) => api.post<any>(`/agents/${strategy}/run`),
};

export const transferApi = {
  balance: () => api.get<any>('/transfer/balance'),
  send: (toAddress: string, amount: string, note?: string) =>
    api.post<any>('/transfer/send', { toAddress, amount, note }),
  history: () => api.get<any[]>('/transfer/history'),
};

export const cardApi = {
  status: async () => {
    try {
      return await api.get<{ issued: boolean; frozen: boolean; last4?: string }>(
        '/card/status',
      );
    } catch {
      return { issued: false, frozen: false, last4: '0000' };
    }
  },
  issue: () => api.post('/card/issue'),
  freeze: () => api.post('/card/freeze'),
  unfreeze: () => api.post('/card/unfreeze'),
  transactions: async () => {
    try {
      return await api.get<any[]>('/card/transactions');
    } catch {
      return [];
    }
  },
};

export const telegramApi = {
  status: async () => {
    try {
      return await api.get<{ linked: boolean; username?: string }>(
        '/telegram/link-status',
      );
    } catch {
      return { linked: false };
    }
  },
  link: (platformId: string) => api.post('/telegram/link', { platformId }),
  unlink: () => api.delete('/telegram/link'),
};

export interface LaneDefinition {
  id: 'lane1' | 'lane2' | 'lane3';
  name: string;
  description: string;
  targetAPY?: string;
  estimatedAPY?: string;
  riskLevel: string;
  spendAccess: string;
  spread?: number;
  impliedAPY?: number;
  ptDiscount?: number;
  borrowRate?: number;
  ytImpliedAPY?: number;
  srNusdAPY?: number;
  morphoUtilization?: number;
  leverageMultiplier?: number;
}

export interface SpendBalance {
  yieldBalance: string;
  liquidBalance: string;
  totalSpendable: string;
}

export interface SpendTransaction {
  _id: string;
  type: 'qr_pay' | 'p2p' | 'card';
  amount: string;
  currency: string;
  recipient: string;
  settlementSource: 'yield' | 'liquid' | 'mixed';
  status: string;
  note?: string;
  createdAt: string;
}

export interface LanePosition {
  lane1AllocationBps: number;
  lane2AllocationBps: number;
  lane3AllocationBps: number;
  yieldBalance: string;
  liquidBalance: string;
}

export const laneApi = {
  getLanes: () => api.get<LaneDefinition[]>('/lanes'),
  getMyAllocation: () => api.get<LanePosition>('/lanes/my-allocation'),
  allocate: (body: { lane1Bps: number; lane2Bps: number; lane3Bps: number }) =>
    api.post<LanePosition>('/lanes/allocate', body),
  getDecisions: (lane: string) => api.get<any[]>(`/lanes/${lane}/decisions`),
};

export const spendApi = {
  getBalance: () => api.get<SpendBalance>('/spend/balance'),
  qrPay: (body: { recipientAddress: string; amount: string; note?: string; txDigest?: string }) =>
    api.post<SpendTransaction>('/spend/qr-pay', body),
  getHistory: () => api.get<SpendTransaction[]>('/spend/history'),
};
