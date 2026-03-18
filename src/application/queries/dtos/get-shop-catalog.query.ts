import { Query } from "@nestjs/cqrs";

export class GetShopCatalogQuery extends Query<{
  catalog: {
    id: number;
    productId: number;
    name: string;
    priceInCents: number;
    dosage: string;
    containerType: string;
    productType: string;
  }[];
}> {
  constructor(public readonly shopId: number) {
    super();
  }
}
