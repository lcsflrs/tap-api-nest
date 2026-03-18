import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FindProductsInOrderQuery } from "./dtos/find-products-in-order.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import {
  OrderSchemaClass,
  OrderDocument,
} from "@infrastructure/mongodb/schemas/order.schema";

@QueryHandler(FindProductsInOrderQuery)
export class FindProductsInOrderHandler implements IQueryHandler<FindProductsInOrderQuery> {
  constructor(
    @Inject() private readonly prisma: PrismaService,
    @InjectModel(OrderSchemaClass.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async execute(query: FindProductsInOrderQuery) {
    const order = await this.orderModel.findById(query.orderId).lean();

    if (!order) {
      throw new Error("Order not found");
    }

    const productIds = order.products.map((p) => p.id);

    const shopProducts = await this.prisma.shopProduct.findMany({
      where: { id: { in: productIds } },
      include: { product: true },
    });

    const shopProductMap = new Map(shopProducts.map((sp) => [sp.id, sp]));

    return {
      products: order.products.map((item) => {
        const sp = shopProductMap.get(item.id)!;
        return {
          shopProduct: {
            shopProductId: sp.id,
            productId: sp.productId ?? 0,
            shopId: sp.shopId,
            priceInCents: sp.priceInCents,
            isAvailable: sp.isActive ?? false,
            name: sp.product?.name ?? "",
          },
          quantity: item.quantity,
          productPriceInCents: item.priceInCents,
        };
      }),
    };
  }
}
