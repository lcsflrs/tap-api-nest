import { ValueObject } from "@domain/@shared/interfaces/value-object.interface";

export type PixStatusValue =
  | "created"
  | "pending"
  | "paid"
  | "expired"
  | "canceled";

export class PixStatus implements ValueObject<string> {
  private constructor(private readonly _value: PixStatusValue) {}

  static created(): PixStatus {
    return new PixStatus("created");
  }

  static pending(): PixStatus {
    return new PixStatus("pending");
  }

  static paid(): PixStatus {
    return new PixStatus("paid");
  }

  static expired(): PixStatus {
    return new PixStatus("expired");
  }

  static canceled(): PixStatus {
    return new PixStatus("canceled");
  }

  static from(value: string): PixStatus {
    if (
      value !== "created" &&
      value !== "pending" &&
      value !== "paid" &&
      value !== "expired" &&
      value !== "canceled"
    ) {
      throw new Error(`Invalid pix status: ${value}`);
    }

    return new PixStatus(value);
  }

  isPaid(): boolean {
    return this._value === "paid";
  }

  isExpired(): boolean {
    return this._value === "expired";
  }

  isCanceled(): boolean {
    return this._value === "canceled";
  }

  isTerminal(): boolean {
    return (
      this._value === "paid" ||
      this._value === "expired" ||
      this._value === "canceled"
    );
  }

  getValue(): string {
    return this._value;
  }

  equals(other: PixStatus): boolean {
    return this._value === other._value;
  }
}
