export interface PaymentTokenData {
  amount: number;
  cardToken: string;
  installments: number;
  partyId: number;
  paymentStatus: string;
  qrcode: string;
  serviceStatus: string;
  party: { id: number; name: string; address: string };
  user: { id: number; customerId: string; name: string };
  products: { amount: number; code: string; name: string; quantity: number }[];
  payedAt?: Date;
  transactionId?: string;
}

export interface IPaymentTokenRepository {
  save(data: PaymentTokenData): Promise<string>;
  findById(id: string): Promise<PaymentTokenData | null>;
  updateStatus(
    id: string,
    status: string,
    extra?: { payedAt?: Date; transactionId?: string },
  ): Promise<void>;
  updateServiceStatus(id: string, serviceStatus: string): Promise<void>;
  updateTransactionId(
    id: string,
    transactionId: string,
    payedAt: Date,
  ): Promise<void>;
}
