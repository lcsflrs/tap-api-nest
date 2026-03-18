import { StoreSale } from "@domain/store/sale/store-sale.aggregate";

export interface IStoreSaleRepository {
  save(sale: StoreSale): Promise<void>;
  update(sale: StoreSale): Promise<void>;
  findById(id: number): Promise<StoreSale | null>;
  findForPayout(
    shopId: number,
    storeSaleIds: number[],
    date: string,
  ): Promise<{
    storeId: number;
    shopName: string;
    storeSales: Array<{
      id: number;
      orderId: string;
      totalInCents: number;
    }>;
  }>;
  saveWithPaymentTransaction(
    sale: StoreSale,
    customerId: number,
    amountInCents: number,
  ): Promise<void>;
  saveCardPaymentTransaction(sale: StoreSale): Promise<void>;
}
