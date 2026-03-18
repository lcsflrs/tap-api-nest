import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetShopCatalogQuery } from "./dtos/get-shop-catalog.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(GetShopCatalogQuery)
export class GetShopCatalogHandler implements IQueryHandler<GetShopCatalogQuery> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: GetShopCatalogQuery) {
    const shop = await this.prisma.shop.findUnique({
      where: { id: query.shopId },
      include: {
        shopProducts: {
          where: { isActive: true },
          include: {
            product: {
              include: {
                dosageUnit: true,
                containerType: true,
                productType: true,
              },
            },
          },
        },
      },
    });

    if (!shop) {
      throw new Error("Shop not found");
    }

    return {
      catalog: shop.shopProducts.map((item) => ({
        id: item.id,
        productId: item.product?.id ?? 0,
        name: item.product?.name ?? "",
        priceInCents: item.priceInCents,
        dosage: `${item.product?.dosage ?? ""} ${item.product?.dosageUnit?.name ?? ""}`,
        containerType: item.product?.containerType?.name ?? "",
        productType: item.product?.productType?.name ?? "",
      })),
    };
  }
}
