import { Entity } from "@domain/@shared/interfaces/entity.abstract";
import { Cents } from "@domain/@shared/value-objects/cents.value";
import { PaymentMethod } from "@domain/@shared/value-objects/payment-method.value";
import { CustomerID } from "./customer-id.value";

export class CustomerWallet extends Entity<CustomerID> {
  constructor(
    private readonly _customerId: CustomerID,
    private _balance: Cents,
    private _defaultCreditCardId?: string | null,
    private _defaultPaymentMethod?: PaymentMethod | null,
  ) {
    super(_customerId);
  }

  static create(
    customerId: number,
    balanceInCents: number,
    defaultCreditCardId?: string | null,
    defaultPaymentMethod?: PaymentMethod | null,
  ): CustomerWallet {
    if (balanceInCents < 0) {
      throw new Error("Wallet balance cannot be negative");
    }

    return new CustomerWallet(
      new CustomerID(customerId),
      Cents.create(balanceInCents),
      defaultCreditCardId ?? null,
      defaultPaymentMethod ?? null,
    );
  }

  static fromJSON(json: CustomerWalletJSON): CustomerWallet {
    return new CustomerWallet(
      new CustomerID(json.customerId),
      Cents.create(json.balance),
      json.defaultCreditCardId ?? null,
      json.defaultPaymentMethod
        ? PaymentMethod.fromString(json.defaultPaymentMethod)
        : null,
    );
  }

  toJSON(): CustomerWalletJSON {
    return {
      customerId: this._customerId.getValue(),
      balance: this._balance.getValue(),
      defaultCreditCardId: this._defaultCreditCardId ?? null,
      defaultPaymentMethod: this._defaultPaymentMethod
        ? String(this._defaultPaymentMethod.getValue())
        : null,
    };
  }

  credit(amount: Cents): void {
    if (amount.getValue() <= 0) {
      throw new Error("Credit amount must be greater than zero");
    }

    this._balance = this._balance.add(amount);
  }

  debit(amount: Cents): void {
    if (amount.getValue() <= 0) {
      throw new Error("Debit amount must be greater than zero");
    }

    if (this._balance.getValue() < amount.getValue()) {
      throw new Error("Insufficient wallet balance");
    }

    this._balance = this._balance.subtract(amount);
  }

  setDefaultPaymentMethod(method: PaymentMethod | null): void {
    this._defaultPaymentMethod = method;
  }

  setDefaultCreditCardId(cardId: string | null | undefined): void {
    this._defaultCreditCardId = cardId ?? null;
  }

  get balance(): Cents {
    return this._balance;
  }

  get customerId(): CustomerID {
    return this._customerId;
  }

  get defaultPaymentMethod(): PaymentMethod | null | undefined {
    return this._defaultPaymentMethod;
  }

  get defaultCreditCardId(): string | null | undefined {
    return this._defaultCreditCardId;
  }
}

export interface CustomerWalletJSON {
  customerId: number;
  balance: number;
  defaultCreditCardId?: string | null;
  defaultPaymentMethod?: string | null;
}
