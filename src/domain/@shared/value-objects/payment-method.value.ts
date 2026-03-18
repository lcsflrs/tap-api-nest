import { ValueObject } from "../interfaces/value-object.interface";

export enum PaymentMethodType {
  CASH = "cash",
  CREDIT_CARD = "credit_card",
  DEBIT_CARD = "debit_card",
  PIX = "pix",
  COURTESY = "courtesy",
  BONUS = "bonus",
  BALANCE = "balance",
}

const ID_TO_TYPE: Record<number, PaymentMethodType> = {
  1: PaymentMethodType.CASH,
  2: PaymentMethodType.CREDIT_CARD,
  3: PaymentMethodType.DEBIT_CARD,
  4: PaymentMethodType.PIX,
  5: PaymentMethodType.COURTESY,
  6: PaymentMethodType.BONUS,
  7: PaymentMethodType.BALANCE,
};

const TYPE_TO_ID: Record<PaymentMethodType, number> = Object.fromEntries(
  Object.entries(ID_TO_TYPE).map(([id, type]) => [type, Number(id)]),
) as Record<PaymentMethodType, number>;

export class PaymentMethod implements ValueObject<PaymentMethodType> {
  private constructor(private readonly _value: PaymentMethodType) {}

  static readonly PIX_ID = 4;

  static create(value: PaymentMethodType): PaymentMethod {
    return new PaymentMethod(value);
  }

  static fromString(value: string): PaymentMethod {
    const match = Object.values(PaymentMethodType).find((v) => v === value);

    if (!match) {
      throw new Error("Invalid payment method value");
    }

    return new PaymentMethod(match);
  }

  static fromId(id: number): PaymentMethod {
    const type = ID_TO_TYPE[id];

    if (!type) {
      throw new Error("Invalid payment method id");
    }

    return new PaymentMethod(type);
  }

  getValue(): PaymentMethodType {
    return this._value;
  }

  toId(): number {
    return TYPE_TO_ID[this._value];
  }

  equals(other: PaymentMethod): boolean {
    return this._value === other._value;
  }
}
