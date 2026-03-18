import { Query } from "@nestjs/cqrs";

// TODO: DTO provisório — shapes de catalog, workers e lastSales devem ser revisados

export type ShopCatalogItem = {
  id: number;
  productId: number;
  name: string;
  priceInCents: number;
  dosage: string;
  containerType: string;
  productType: string;
};

export type ShopWorkerItem = {
  workerId: number;
  shopId: number;
  name: string;
  expirationDate: Date;
  role: number;
  accessJwt: string;
};

export type ShopSaleProduct = {
  id: number;
  name: string;
  storeSalesId: number;
  shopProductId: number;
  productId: number;
  quantity: number;
  priceInCents: number;
  totalInCents: number;
};

export type ShopLastSaleItem = {
  id: number;
  storeId: number;
  shopId: number;
  paymentMethodId: number;
  orderId: string;
  status: string;
  totalInCents: number;
  installments: number;
  interestInCents?: number;
  paidAt?: Date;
  refundedAt?: Date;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
  products: ShopSaleProduct[];
};

export class GetShopQuery extends Query<{
  catalog: ShopCatalogItem[];
  workers: ShopWorkerItem[];
  lastSales: ShopLastSaleItem[];
}> {
  constructor(
    public readonly shopId: number,
    public readonly ownerId: number,
  ) {
    super();
  }
}
