import { ValueObject } from "@domain/@shared/interfaces/value-object.interface";

export type WalletTransactionTypeValue = "in" | "out";

export class WalletTransactionType implements ValueObject<WalletTransactionTypeValue> {
  private value: WalletTransactionTypeValue;

  private constructor(value: WalletTransactionTypeValue) {
    this.value = value;
  }

  static IN(): WalletTransactionType {
    return new WalletTransactionType("in");
  }

  static OUT(): WalletTransactionType {
    return new WalletTransactionType("out");
  }

  static create(value: string): WalletTransactionType {
    if (value !== "in" && value !== "out") {
      throw new Error("Invalid wallet transaction type");
    }

    return new WalletTransactionType(value);
  }

  equals(other: this): boolean {
    return this.value === other.getValue();
  }

  getValue(): WalletTransactionTypeValue {
    return this.value;
  }

  isIn(): boolean {
    return this.value === "in";
  }

  isOut(): boolean {
    return this.value === "out";
  }
}
