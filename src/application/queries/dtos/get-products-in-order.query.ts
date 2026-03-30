import { Query } from "@nestjs/cqrs";

export type GetProductsInOrderResult = {
  products: {
    shopProduct: {
      shopProductId: number;
      productId: number;
      shopId: number;
      priceInCents: number;
      isAvailable: boolean;
      name: string;
    };
    quantity: number;
    productPriceInCents: number;
  }[];
};

export class GetProductsInOrderQuery extends Query<GetProductsInOrderResult> {
  constructor(public readonly orderId: string) {
    super();
  }
}
