import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import {
  OrderDocument,
  OrderSchemaClass,
} from "@infrastructure/mongodb/schemas/order.schema";
import {
  GetProductsInOrderQuery,
  GetProductsInOrderResult,
} from "./dtos/get-products-in-order.query";

@QueryHandler(GetProductsInOrderQuery)
export class GetProductsInOrderHandler implements IQueryHandler<
  GetProductsInOrderQuery,
  GetProductsInOrderResult
> {
  constructor(
    @Inject() private readonly prisma: PrismaService,
    @InjectModel(OrderSchemaClass.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async execute(
    query: GetProductsInOrderQuery,
  ): Promise<GetProductsInOrderResult> {
    const order = await this.orderModel.findById(query.orderId).lean();

    if (!order) {
      throw new Error("Order not found");
    }

    const shopProductIds = order.products.map((product) => product.id);

    const shopProducts = await this.prisma.shopProduct.findMany({
      where: {
        id: { in: shopProductIds },
      },
      include: {
        product: true,
      },
    });

    const products = order.products.map((product) => {
      const shopProduct = shopProducts.find((item) => item.id === product.id);

      if (!shopProduct) {
        throw new Error("Shop product not found");
      }

      if (!shopProduct.product) {
        throw new Error("Product relation not found for shop product");
      }

      if (shopProduct.productId === null) {
        throw new Error("Product id not found for shop product");
      }

      return {
        shopProduct: {
          shopProductId: shopProduct.id,
          productId: shopProduct.productId,
          shopId: shopProduct.shopId,
          priceInCents: shopProduct.priceInCents,
          isAvailable: shopProduct.isActive ?? false,
          name: shopProduct.product.name,
        },
        quantity: product.quantity,
        productPriceInCents: product.priceInCents,
      };
    });

    return { products };
  }
}
