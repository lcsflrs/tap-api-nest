import { Query } from "@nestjs/cqrs";

export class GetAllShopProductsQuery extends Query<{
  products: {
    id: number;
    productId: number;
    name: string;
    priceInCents: number;
    dosage: string;
    containerType: string;
    productType: string;
    isActive: boolean;
  }[];
}> {
  constructor(public readonly shopId: number) {
    super();
  }
}
