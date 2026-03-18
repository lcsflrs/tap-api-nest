import { ValueObject } from "@domain/@shared/interfaces/value-object.interface";

export type OrderStatusValue = "waiting_payment" | "paid" | "refunded";

export class OrderStatus implements ValueObject<string> {
  private constructor(private readonly _value: OrderStatusValue) {}

  static waitingPayment(): OrderStatus {
    return new OrderStatus("waiting_payment");
  }

  static paid(): OrderStatus {
    return new OrderStatus("paid");
  }

  static refunded(): OrderStatus {
    return new OrderStatus("refunded");
  }

  static from(value: string): OrderStatus {
    if (
      value !== "waiting_payment" &&
      value !== "paid" &&
      value !== "refunded"
    ) {
      throw new Error(`Invalid order status: ${value}`);
    }

    return new OrderStatus(value);
  }

  getValue(): string {
    return this._value;
  }

  equals(other: OrderStatus): boolean {
    return this._value === other._value;
  }
}
