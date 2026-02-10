export interface IStoreSaleRepository {
  findSalesForPayout(
    shopId: number,
    saleIds: number[],
    date: string,
  ): Promise<{
    storeId: number;
    shopName: string;
    sales: Array<{
      id: number;
      orderId: string;
      totalInCents: number;
    }>;
  }>;
}
