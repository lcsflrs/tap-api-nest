import { Order } from "@domain/order/order.aggregate";

export class OrderMapper {
  static toPersistence(order: Order) {
    return {
      id: order.getId().getValue(),
      customerId: order.customerId.getValue(),
      shopId: order.shopId.getValue(),
      installments: order.installments,
      status: order.status.getValue(),
      totalInCents: order.totalInCents.getValue(),
      items: order.items.map((item) => ({
        shopProductId: item.shopProduct.shopProductId.getValue(),
        name: item.shopProduct.name,
        quantity: item.quantity,
        unitPriceInCents: item.unitPriceInCents.getValue(),
      })),
    };
  }

  static toDomain(order: any): Order {
    return Order.fromJSON({
      id: order.id,
      customerId: order.customerId,
      shopId: order.shopId,
      installments: order.installments,
      status: order.status,
      totalInCents: order.totalInCents,
      items: order.items.map((item: any) => ({
        shopProduct: {
          id: item.shopProductId,
          name: item.name,
          priceInCents: item.unitPriceInCents,
          isAvailable: true,
        },
        quantity: item.quantity,
        productPriceInCents: item.unitPriceInCents,
      })),
    });
  }
}
