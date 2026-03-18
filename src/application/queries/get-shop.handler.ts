import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetShopQuery } from "./dtos/get-shop.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import type { IJwtService } from "@infrastructure/adapters/jwt/jwt.interface";

// TODO: implementação provisória — catalog, workers e lastSales agregados diretamente
@QueryHandler(GetShopQuery)
export class GetShopHandler implements IQueryHandler<GetShopQuery> {
  constructor(
    @Inject() private readonly prisma: PrismaService,
    @Inject("JwtService") private readonly jwtService: IJwtService,
  ) {}

  async execute(query: GetShopQuery) {
    const { shopId } = query;

    const [shop, sales] = await Promise.all([
      this.prisma.shop.findUnique({
        where: { id: shopId },
        include: {
          shopWorkers: true,
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
      }),
      this.prisma.storeSale.findMany({
        where: { shopId },
        orderBy: { createdAt: "desc" },
        take: 10, // TODO: tornar configurável via query DTO
        include: {
          saleProducts: {
            include: {
              shopProduct: {
                include: { product: true },
              },
            },
          },
        },
      }),
    ]);

    if (!shop) {
      throw new Error("Shop not found");
    }

    const workers = await Promise.all(
      shop.shopWorkers
        .filter(
          (worker) =>
            worker.expirationDate instanceof Date &&
            !isNaN(worker.expirationDate.getTime()),
        )
        .map(async (worker) => {
          const ttl = worker.expirationDate!.getTime() - Date.now();
          const accessJwt = await this.jwtService.signWithTtl(
            { shopId, workerId: worker.id },
            ttl,
          );
          return {
            workerId: worker.id,
            shopId,
            name: worker.name ?? "",
            expirationDate: worker.expirationDate!,
            role: worker.role,
            accessJwt,
          };
        }),
    );

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
      workers,
      lastSales: sales.map((sale) => ({
        id: sale.id,
        storeId: sale.storeId,
        shopId: sale.shopId,
        paymentMethodId: sale.paymentMethodId,
        orderId: sale.orderId,
        status: sale.status,
        totalInCents: sale.totalInCents,
        installments: sale.installments ?? 0,
        interestInCents: sale.interestInCents ?? undefined,
        paidAt: sale.paidAt ?? undefined,
        refundedAt: sale.refundedAt ?? undefined,
        transactionId: sale.transactionId ?? undefined,
        createdAt: sale.createdAt,
        updatedAt: sale.updatedAt,
        products: sale.saleProducts.map((sp) => ({
          id: sp.id,
          name: sp.shopProduct.product?.name ?? "",
          storeSalesId: sp.storeSaleId,
          shopProductId: sp.shopProductId,
          productId: sp.shopProduct.productId ?? 0,
          quantity: sp.quantity,
          priceInCents: sp.priceInCents,
          totalInCents: sp.totalInCents,
        })),
      })),
    };
  }
}
