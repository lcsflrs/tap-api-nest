import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GetTokenRecommendationQuery } from "./dtos/get-token-recommendation.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import {
  PaymentTokenSchemaClass,
  PaymentTokenDocument,
} from "@infrastructure/mongodb/schemas/payment-token.schema";

type ProcessedProduct = {
  id: number;
  name: string;
  quantity: number;
};

@QueryHandler(GetTokenRecommendationQuery)
export class GetTokenRecommendationHandler implements IQueryHandler<GetTokenRecommendationQuery> {
  constructor(
    @Inject() private readonly prisma: PrismaService,
    @InjectModel(PaymentTokenSchemaClass.name)
    private readonly paymentTokenModel: Model<PaymentTokenDocument>,
  ) {}

  async execute(query: GetTokenRecommendationQuery) {
    const { customerId, partyId } = query;

    const partyPaymentTokens = await this.paymentTokenModel
      .find({
        "user.id": customerId,
        "party.id": partyId,
        paymentStatus: "paid",
      })
      .exec();

    const products = partyPaymentTokens.reduce(
      (acc: ProcessedProduct[], curr) => {
        for (const p of curr.products) {
          const existing = acc.find((a) => a.id === Number(p.code));

          if (existing) {
            existing.quantity += p.quantity;
          } else {
            acc.push({
              id: Number(p.code),
              name: p.name,
              quantity: p.quantity,
            });
          }
        }

        return acc;
      },
      [],
    );

    const orderedIds = products
      .sort((a, b) => b.quantity - a.quantity)
      .map((p) => p.id);

    const partyShops = await this.prisma.partyShop.findMany({
      where: { partyId, isActive: true },
      include: {
        shop: {
          include: {
            shopProducts: {
              where: { productId: { in: orderedIds } },
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

    const favoriteProductsStock = partyShops.flatMap((ps) =>
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

    return { favoriteProductsStock };
  }
}
