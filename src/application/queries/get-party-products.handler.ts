import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetPartyProductsQuery } from "./dtos/get-party-products.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(GetPartyProductsQuery)
export class GetPartyProductsHandler implements IQueryHandler<GetPartyProductsQuery> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: GetPartyProductsQuery) {
    const { partyId } = query;

    const party = await this.prisma.party.findUnique({
      where: { id: partyId },
    });

    if (!party) {
      throw new Error("Party not found");
    }

    const partyShops = await this.prisma.partyShop.findMany({
      where: { partyId, isActive: true },
      include: {
        shop: {
          include: {
            shopProducts: {
              include: { product: true },
            },
          },
        },
      },
    });

    const products = partyShops.flatMap((ps) =>
      ps.shop.shopProducts
        .filter((sp) => sp.product !== null)
        .map((sp) => ({
          id: sp.product!.id,
          name: sp.product!.name,
          isActive: sp.isActive ?? false,
        })),
    );

    return { products };
  }
}
