import { Query } from "@nestjs/cqrs";

export class FindProductsInOrderQuery extends Query<{
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
}> {
  constructor(public readonly orderId: string) {
    super();
  }
}
