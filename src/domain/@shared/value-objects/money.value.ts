import type { ValueObject } from "../interfaces/value-object.interface";

export class Money implements ValueObject<number> {
  constructor(private readonly _amountInCents: number) {
    if (!Number.isInteger(_amountInCents)) {
      throw new Error("Money value must be an integer");
    }

    if (_amountInCents < 0) {
      throw new Error("Money value cannot be negative");
    }
  }

  static create(amountInCents: number): Money {
    return new Money(amountInCents);
  }

  getValue(): number {
    return this._amountInCents;
  }

  equals(other: Money): boolean {
    return this._amountInCents === other._amountInCents;
  }

  add(other: Money): Money {
    return new Money(this._amountInCents + other._amountInCents);
  }

  multiply(factor: number): Money {
    return new Money(this._amountInCents * factor);
  }

  subtract(amount: Money): Money {
    const result = this._amountInCents - amount._amountInCents;

    if (result < 0) {
      throw new Error("Money subtraction result cannot be negative");
    }

    return new Money(result);
  }

  static fromString(value: string): Money {
    const amountInCents = parseInt(value.replace(/\D/g, ""), 10);

    if (isNaN(amountInCents)) {
      throw new Error("Invalid money value");
    }

    return new Money(amountInCents);
  }

  toString(): string {
    return `${this._amountInCents / 100}`;
  }
}
