import type { ValueObject } from "../interfaces/value-object.interface";

export class PayoutStatus implements ValueObject<string> {
  static readonly PENDING = new PayoutStatus("PENDING");
  static readonly PAID = new PayoutStatus("PAID");

  private static readonly VALID_STATUSES = ["PENDING", "PAID"] as const;
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static fromString(value: string): PayoutStatus {
    const upperValue = value.toUpperCase();

    if (!this.isValid(upperValue)) {
      throw new Error("Invalid payout status");
    }

    return upperValue === "PAID" ? PayoutStatus.PAID : PayoutStatus.PENDING;
  }

  private static isValid(value: string): boolean {
    return this.VALID_STATUSES.includes(value as any);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: this): boolean {
    return this.value === other.value;
  }

  isPending(): boolean {
    return this === PayoutStatus.PENDING;
  }

  isPaid(): boolean {
    return this === PayoutStatus.PAID;
  }

  toString(): string {
    return this.value;
  }
}
