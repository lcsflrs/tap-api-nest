import { Query } from "@nestjs/cqrs";

export class GetPartyProductsQuery extends Query<{
  products: { id: number; name: string; isActive: boolean }[];
}> {
  constructor(public readonly partyId: number) {
    super();
  }
}
