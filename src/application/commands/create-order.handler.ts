import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { randomUUID } from "crypto";
import { CreateOrderCommand } from "./dtos/create-order.command";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import type { ICustomerRepository } from "@infrastructure/repositories/interfaces/customer-repository.interface";
import type { IOrderRepository } from "@infrastructure/repositories/interfaces/order-repository.interface";
import type { IJwtService } from "@infrastructure/adapters/jwt/jwt.interface";
import { Order } from "@domain/order/order.aggregate";
import { OrderID } from "@domain/order/order-id.value";
import { OrderItem } from "@domain/order/order-item.value";
import { CustomerID } from "@domain/customer/customer-id.value";
import { ShopID } from "@domain/store/shop-id.value";
import { ShopProduct } from "@domain/store/shop-product.entity";
import { ShopProductID } from "@domain/store/shop-product-id.value";
import { PaymentMethodType } from "@domain/@shared/value-objects/payment-method.value";

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    @Inject() private readonly prisma: PrismaService,
    @Inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository,
    @Inject("OrderRepository")
    private readonly orderRepository: IOrderRepository,
    @Inject("JwtService")
    private readonly jwtService: IJwtService,
  ) {}

  async execute(command: CreateOrderCommand) {
    const { customerId, shopId, installments, orderItems } = command;

    if (!orderItems.length) {
      throw new Error("Order items cannot be empty");
    }

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new Error("Customer not found");
    }

    if (!customer.wallet) {
      throw new Error("Wallet not found for customer");
    }

    const shopProductIds = orderItems.map((i) => i.shopProductId);

    const rawShopProducts = await this.prisma.shopProduct.findMany({
      where: { id: { in: shopProductIds }, shopId },
    });

    if (rawShopProducts.length !== shopProductIds.length) {
      throw new Error("One or more products not found in this shop");
    }

    if (
      customer.wallet.defaultPaymentMethod?.getValue() ===
      PaymentMethodType.BALANCE
    ) {
      const total = rawShopProducts.reduce((acc, product) => {
        const item = orderItems.find((i) => i.shopProductId === product.id);
        if (!item) return acc;
        return acc + product.priceInCents * item.quantity;
      }, 0);

      if (customer.wallet.balance.getValue() < total) {
        throw new Error("Saldo insuficiente na carteira");
      }
    }

    const domainItems = orderItems.map((item) => {
      const raw = rawShopProducts.find((p) => p.id === item.shopProductId)!;

      const shopProduct = ShopProduct.create(
        new ShopProductID(raw.id),
        null,
        new ShopID(raw.shopId),
        null,
        raw.priceInCents,
        raw.isActive ?? true,
      );

      return OrderItem.create(shopProduct, item.quantity);
    });

    const orderId = new OrderID(randomUUID());

    const order = Order.create(
      orderId,
      new CustomerID(customerId),
      new ShopID(shopId),
      domainItems,
      installments,
    );

    await this.orderRepository.create(order);

    const jwtToken = await this.jwtService.sign({
      orderId: order.getId().getValue(),
      customerId: order.customerId.getValue(),
      paymentTokenId: order.getId().getValue(),
      userId: order.customerId.getValue(),
    });

    return {
      orderId: order.getId().getValue(),
      jwtToken,
    };
  }
}
