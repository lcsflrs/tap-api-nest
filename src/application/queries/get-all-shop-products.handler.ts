import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetAllShopProductsQuery } from "./dtos/get-all-shop-products.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(GetAllShopProductsQuery)
export class GetAllShopProductsHandler implements IQueryHandler<GetAllShopProductsQuery> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: GetAllShopProductsQuery) {
    const shop = await this.prisma.shop.findUnique({
      where: { id: query.shopId },
      include: {
        shopProducts: {
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
      products: shop.shopProducts.map((item) => ({
        id: item.id,
        productId: item.product?.id ?? 0,
        name: item.product?.name ?? "",
        priceInCents: item.priceInCents,
        dosage: `${item.product?.dosage ?? ""} ${item.product?.dosageUnit?.name ?? ""}`,
        containerType: item.product?.containerType?.name ?? "",
        productType: item.product?.productType?.name ?? "",
        isActive: item.isActive ?? false,
      })),
    };
  }
}
