import { Query } from "@nestjs/cqrs";

export class GetShopListQuery extends Query<{
  list: { name: string; shopId: number }[];
}> {
  constructor(
    public readonly storeId: number,
    public readonly ownerId: number,
  ) {
    super();
  }
}
