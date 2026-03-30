import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { SetPartyProductsCommand } from "./dtos/set-party-products.command";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@CommandHandler(SetPartyProductsCommand)
export class SetPartyProductsHandler implements ICommandHandler<SetPartyProductsCommand> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(command: SetPartyProductsCommand) {
    const { partyId, productsAvailableId } = command;

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
            shopProducts: { include: { product: true } },
          },
        },
      },
    });

    const allShopProducts = partyShops.flatMap((ps) => ps.shop.shopProducts);

    await Promise.all(
      allShopProducts
        .filter((sp) => sp.product !== null)
        .map((sp) =>
          this.prisma.shopProduct.update({
            where: { id: sp.id },
            data: { isActive: productsAvailableId.includes(sp.product!.id) },
          }),
        ),
    );

    const updated = await this.prisma.partyShop.findMany({
      where: { partyId, isActive: true },
      include: {
        shop: {
          include: {
            shopProducts: { include: { product: true } },
          },
        },
      },
    });

    const products = updated.flatMap((ps) =>
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
