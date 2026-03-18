import { ValueObject } from "@domain/@shared/interfaces/value-object.interface";

export class UnitOfMeasure implements ValueObject<string> {
  constructor(private readonly _value: string) {}

  static create(value: string): UnitOfMeasure {
    if (value.trim().length === 0) {
      throw new Error("Product unit of measure is required");
    }

    return new UnitOfMeasure(value);
  }

  getValue(): string {
    return this._value;
  }

  equals(other: UnitOfMeasure): boolean {
    return this._value === other.getValue();
  }
}
