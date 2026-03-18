export interface CashierTokenData {
  amount: number;
  braceletNumber: string;
  partyId: number;
  paymentMethod: string;
  party: { id: number; name: string; address: string };
  products: { amount: number; code: string; name: string; quantity: number }[];
}

export interface ICashierTokenRepository {
  save(data: CashierTokenData): Promise<string>;
  findById(id: string): Promise<CashierTokenData | null>;
}
