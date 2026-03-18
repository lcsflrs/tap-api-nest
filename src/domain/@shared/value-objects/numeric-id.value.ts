import { ValueObject } from "../interfaces/value-object.interface";

export class NumericID implements ValueObject<number> {
  constructor(protected readonly value: number) {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error("ID must be a positive integer");
    }

    this.value = value;
  }

  static create(value: number): NumericID {
    return new NumericID(value);
  }

  getValue(): number {
    return this.value;
  }

  equals(other: this): boolean {
    if (!other) {
      return false;
    }

    return this.value === other.value;
  }

  toString(): string {
    return String(this.value);
  }
}
