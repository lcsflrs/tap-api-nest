import { Query } from "@nestjs/cqrs";

export class GetTokenRecommendationQuery extends Query<{
  favoriteProductsStock: {
    id: number;
    name: string;
    price: number;
    dosage: string;
    containerType: string;
    productType: string;
  }[];
}> {
  constructor(
    public readonly customerId: number,
    public readonly partyId: number,
  ) {
    super();
  }
}
