import { CommandHandler, ICommandHandler, CommandBus } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { randomBytes } from "crypto";
import { PurchaseOrderCommand } from "./dtos/purchase-order.command";
import type { ICustomerRepository } from "@infrastructure/repositories/interfaces/customer-repository.interface";
import type { IStoreRepository } from "@infrastructure/repositories/interfaces/store-repository.interface";
import type { IStoreSaleRepository } from "@infrastructure/repositories/interfaces/store-sale-repository.interface";
import type { IOrderRepository } from "@infrastructure/repositories/interfaces/order-repository.interface";
import type { ISocketService } from "@infrastructure/adapters/socket/socket.interface";
import { Customer } from "@domain/customer/customer.aggregate";
import { Store } from "@domain/store/store.aggregate";
import { Cents } from "@domain/@shared/value-objects/cents.value";
import { StoreSale } from "@domain/store/sale/store-sale.aggregate";
import { StoreSaleID } from "@domain/store/sale/store-sale-id.value";
import { StoreSaleProduct } from "@domain/store/sale/store-sale-product.entity";
import { StoreSaleProductID } from "@domain/store/sale/store-sale-product-id.value";
import { ShopProductID } from "@domain/store/shop-product-id.value";
import { CustomerID } from "@domain/customer/customer-id.value";
import { OrderID } from "@domain/order/order-id.value";
import { ShopID } from "@domain/store/shop-id.value";
import { PaymentMethodType } from "@domain/@shared/value-objects/payment-method.value";
import {
  ExecuteCreditTransactionCommand,
  ExecuteCreditTransactionResult,
} from "@infrastructure/third-party/iopay/commands/dtos/execute-credit-transaction.command";
import getInterestValue from "src/utils/price-fuctions/get-interest-value";

type OrderProps = {
  id: string;
  shopId: number;
  installments: number;
  customerId: number;
  totalInCents: number;
  paymentStatus: string;
  products: { shopProductId: number; quantity: number; priceInCents: number }[];
};

type ItemProps = {
  shopProductId: number;
  quantity: number;
  priceInCents: number;
  name: string;
};

@CommandHandler(PurchaseOrderCommand)
export class PurchaseOrderHandler implements ICommandHandler<
  PurchaseOrderCommand,
  { orderId: string; transactionId: string }
> {
  constructor(
    @Inject("OrderRepository")
    private readonly orderRepository: IOrderRepository,
    @Inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository,
    @Inject("StoreRepository")
    private readonly storeRepository: IStoreRepository,
    @Inject("StoreSaleRepository")
    private readonly storeSaleRepository: IStoreSaleRepository,
    @Inject("SocketService")
    private readonly socketService: ISocketService,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(
    command: PurchaseOrderCommand,
  ): Promise<{ orderId: string; transactionId: string }> {
    const order = await this.orderRepository.findByIdWithProducts(
      command.orderId,
    );

    if (!order) {
      throw new Error("order not found");
    }

    const customer = await this.customerRepository.findById(order.customerId);

    if (!customer) {
      throw new Error("customer not found");
    }

    if (!customer.wallet) {
      throw new Error("wallet not found");
    }

    if (!customer.ioCustomerId) {
      throw new Error("customer has no ioCustomerId");
    }

    const worker = await this.storeRepository.findWorkerByIdAndShop(
      command.workerId,
      order.shopId,
    );

    if (!worker) {
      throw new Error("worker not found");
    }

    const shop = await this.storeRepository.findShopById(order.shopId);

    if (!shop) {
      throw new Error("shop not found");
    }

    const store = await this.storeRepository.findById(shop.storeId.getValue());

    if (!store) {
      throw new Error("store not found");
    }

    if (!store.canTransfer()) {
      throw new Error("store has no ioSellerId");
    }

    if (order.paymentStatus === "paid") {
      throw new Error("order already paid");
    }

    if (order.paymentStatus !== "pending") {
      throw new Error("order cannot be paid");
    }

    const paymentMethod = customer.wallet.defaultPaymentMethod?.getValue();

    if (
      paymentMethod === PaymentMethodType.CREDIT_CARD &&
      !customer.wallet.defaultCreditCardId
    ) {
      throw new Error("customer has no default card for card payment");
    }

    const shopProducts = await this.storeRepository.findShopProductsByIds(
      order.products.map((p) => p.shopProductId),
    );

    const shopProductMap = new Map(shopProducts.map((sp) => [sp.id, sp]));

    const items: ItemProps[] = order.products.map((p) => {
      const shopProduct = shopProductMap.get(p.shopProductId);

      if (!shopProduct?.product) {
        throw new Error("shop product not found");
      }

      return {
        shopProductId: p.shopProductId,
        quantity: p.quantity,
        priceInCents: p.priceInCents,
        name: shopProduct.product.name,
      };
    });

    const interestValue = getInterestValue(
      order.totalInCents,
      order.installments,
    );
    const totalInCents = order.totalInCents + interestValue;

    await this.orderRepository.updateStatus(command.orderId, "processing");
    this.socketService.emitOrderUpdate(command.orderId, "processing");

    const sharedProps = {
      order,
      customer,
      store,
      items,
      totalInCents,
      interestValue,
    };

    try {
      if (paymentMethod === PaymentMethodType.BONUS) {
        return await this._payWithBalance(sharedProps);
      }

      if (paymentMethod === PaymentMethodType.CREDIT_CARD) {
        return await this._payWithCard(sharedProps);
      }

      throw new Error("unsupported payment method");
    } catch (err: any) {
      await this.orderRepository.updateStatus(command.orderId, "error_payment");
      this.socketService.emitOrderUpdate(command.orderId, "error_payment");
      throw err;
    }
  }

  private async _payWithBalance(props: {
    order: OrderProps;
    customer: Customer;
    store: Store;
    items: ItemProps[];
    totalInCents: number;
    interestValue: number;
  }): Promise<{ orderId: string; transactionId: string }> {
    if ((props.customer.wallet?.balance.getValue() ?? 0) < props.totalInCents) {
      throw new Error("insufficient balance");
    }

    const transactionId = randomBytes(16).toString("hex");

    const interestInCents =
      props.order.installments > 1
        ? Cents.create(props.interestValue)
        : undefined;

    const sale = StoreSale.create(
      new StoreSaleID(0),
      props.store.storeId,
      new ShopID(props.order.shopId),
      null,
      7,
      new CustomerID(props.order.customerId),
      null,
      new OrderID(props.order.id),
      Cents.create(props.totalInCents),
      props.order.installments,
      interestInCents,
      transactionId,
    );

    sale.setProducts(
      props.items.map((item) =>
        StoreSaleProduct.create(
          new StoreSaleProductID(0),
          new StoreSaleID(0),
          new ShopProductID(item.shopProductId),
          item.quantity,
          item.priceInCents,
        ),
      ),
    );

    await this.storeSaleRepository.saveWithPaymentTransaction(
      sale,
      props.order.customerId,
      props.totalInCents,
    );

    await this.orderRepository.updateStatus(props.order.id, "paid");
    this.socketService.emitOrderUpdate(props.order.id, "paid");

    return { orderId: props.order.id, transactionId };
  }

  private async _payWithCard(props: {
    order: OrderProps;
    customer: Customer;
    store: Store;
    items: ItemProps[];
    totalInCents: number;
    interestValue: number;
  }): Promise<{ orderId: string; transactionId: string }> {
    const { transactionId } = await this.commandBus.execute<
      ExecuteCreditTransactionCommand,
      ExecuteCreditTransactionResult
    >(
      new ExecuteCreditTransactionCommand(
        props.customer.ioCustomerId!,
        props.customer.wallet!.defaultCreditCardId!,
        props.totalInCents,
        props.order.installments,
        props.order.id,
        props.store.name,
        props.store.statementDescriptor ?? props.store.name,
        props.items.map((item) => ({
          id: String(item.shopProductId),
          name: item.name,
          priceInCents: item.priceInCents,
          quantity: item.quantity,
        })),
      ),
    );

    const interestInCents =
      props.order.installments > 1
        ? Cents.create(props.interestValue)
        : undefined;

    const sale = StoreSale.create(
      new StoreSaleID(0),
      props.store.storeId,
      new ShopID(props.order.shopId),
      null,
      2,
      new CustomerID(props.order.customerId),
      null,
      new OrderID(props.order.id),
      Cents.create(props.totalInCents),
      props.order.installments,
      interestInCents,
      transactionId,
    );

    sale.setProducts(
      props.items.map((item) =>
        StoreSaleProduct.create(
          new StoreSaleProductID(0),
          new StoreSaleID(0),
          new ShopProductID(item.shopProductId),
          item.quantity,
          item.priceInCents,
        ),
      ),
    );

    await this.storeSaleRepository.saveCardPaymentTransaction(sale);

    await this.orderRepository.updateStatus(props.order.id, "paid");
    this.socketService.emitOrderUpdate(props.order.id, "paid");

    return { orderId: props.order.id, transactionId };
  }
}
