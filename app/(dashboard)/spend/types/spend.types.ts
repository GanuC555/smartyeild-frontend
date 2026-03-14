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
