import { AggregateRoot } from "@domain/@shared/interfaces/aggregate-root.abstract";
import { Cents } from "@domain/@shared/value-objects/cents.value";
import { ShopID } from "@domain/store/shop-id.value";
import { CustomerID } from "@domain/customer/customer-id.value";
import { OrderID } from "./order-id.value";
import { OrderItem, OrderItemJSON } from "./order-item.value";
import { OrderStatus } from "./order-status.value";

export class Order extends AggregateRoot<OrderID> {
  constructor(
    id: OrderID,
    private readonly _customerId: CustomerID,
    private readonly _shopId: ShopID,
    private readonly _items: OrderItem[],
    private readonly _totalInCents: Cents,
    private _status: OrderStatus,
    private readonly _installments: number,
  ) {
    super(id);
  }

  static create(
    id: OrderID,
    customerId: CustomerID,
    shopId: ShopID,
    items: OrderItem[],
    installments: number,
  ): Order {
    if (items.length === 0) {
      throw new Error("Order items cannot be empty");
    }

    if (installments <= 0 || installments > 3) {
      throw new Error("Installments must be between 1 and 3");
    }

    const totalInCents = items.reduce(
      (sum, item) => sum.add(item.totalInCents),
      Cents.create(0),
    );

    return new Order(
      id,
      customerId,
      shopId,
      items,
      totalInCents,
      OrderStatus.waitingPayment(),
      installments,
    );
  }

  static fromJSON(json: OrderJSON): Order {
    const items = json.items.map((i) => OrderItem.fromJSON(i));

    const recalculatedTotal = items.reduce(
      (sum, item) => sum.add(item.totalInCents),
      Cents.create(0),
    );

    return new Order(
      new OrderID(json.id),
      new CustomerID(json.customerId),
      new ShopID(json.shopId),
      items,
      recalculatedTotal,
      OrderStatus.from(json.status),
      json.installments,
    );
  }

  toJSON(): OrderJSON {
    return {
      id: this.id.getValue(),
      customerId: this._customerId.getValue(),
      shopId: this._shopId.getValue(),
      items: this._items.map((i) => i.toJSON()),
      totalInCents: this._totalInCents.getValue(),
      status: this._status.getValue(),
      installments: this._installments,
    };
  }

  markAsPaid(): void {
    if (!this._status.equals(OrderStatus.waitingPayment())) {
      throw new Error("Only orders waiting for payment can be paid");
    }

    this._status = OrderStatus.paid();
  }

  markAsRefunded(): void {
    if (!this._status.equals(OrderStatus.paid())) {
      throw new Error("Only paid orders can be refunded");
    }

    this._status = OrderStatus.refunded();
  }

  alreadyPaid(): boolean {
    return (
      this._status.equals(OrderStatus.paid()) ||
      this._status.equals(OrderStatus.refunded())
    );
  }

  refunded(): boolean {
    return this._status.equals(OrderStatus.refunded());
  }

  canBePaid(): boolean {
    return this._status.equals(OrderStatus.waitingPayment());
  }

  get customerId(): CustomerID {
    return this._customerId;
  }

  get shopId(): ShopID {
    return this._shopId;
  }

  get items(): OrderItem[] {
    return [...this._items];
  }

  get totalInCents(): Cents {
    return this._totalInCents;
  }

  get status(): OrderStatus {
    return this._status;
  }

  get installments(): number {
    return this._installments;
  }
}

export interface OrderJSON {
  id: string;
  customerId: number;
  shopId: number;
  items: OrderItemJSON[];
  totalInCents: number;
  status: string;
  installments: number;
}
