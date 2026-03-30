import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetPartyQuery } from "./dtos/get-party.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(GetPartyQuery)
export class GetPartyHandler implements IQueryHandler<GetPartyQuery> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: GetPartyQuery) {
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
        },
      },
    });

    const stock = partyShops.flatMap((ps) =>
      ps.shop.shopProducts
        .filter((sp) => sp.product !== null)
        .map((sp) => ({
          id: sp.product!.id,
          name: sp.product!.name,
          price: sp.priceInCents,
          dosage:
            `${sp.product!.dosage} ${sp.product!.dosageUnit?.name ?? ""}`.trim(),
          containerType: sp.product!.containerType?.name ?? "",
          productType: sp.product!.productType?.name ?? "",
        })),
    );

    return {
      id: party.id,
      name: party.name,
      date: party.date.toISOString(),
      time: party.time.toISOString(),
      address: party.address,
      stock,
    };
  }
}
