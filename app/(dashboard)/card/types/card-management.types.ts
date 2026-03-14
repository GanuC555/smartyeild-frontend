export interface CardStatus {
  issued: boolean;
  frozen: boolean;
  last4?: string;
}

export interface CardTransaction {
  id?: string;
  _id?: string;
  merchant?: string;
  description?: string;
  createdAt?: string;
  amount?: number | string;
}
