import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetShopListQuery } from "./dtos/get-shop-list.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(GetShopListQuery)
export class GetShopListHandler implements IQueryHandler<GetShopListQuery> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: GetShopListQuery) {
    const store = await this.prisma.store.findUnique({
      where: { id: query.storeId },
      include: { shops: true },
    });

    if (!store) {
      throw new Error("Store not found");
    }

    if (store.ownerId !== query.ownerId) {
      throw new Error("Store does not belong to owner");
    }

    return {
      list: store.shops.map((shop) => ({
        name: shop.name,
        shopId: shop.id,
      })),
    };
  }
}
