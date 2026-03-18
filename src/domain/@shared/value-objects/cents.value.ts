import { ValueObject } from "../interfaces/value-object.interface";

export class Cents implements ValueObject<number> {
  constructor(private readonly _value: number) {
    if (!Number.isInteger(_value)) {
      throw new Error("Cents must be an integer");
    }

    if (_value < 0) {
      throw new Error("Cents must be equal or greater than 0");
    }
  }

  static create(value: number): Cents {
    return new Cents(value);
  }

  getValue(): number {
    return this._value;
  }

  equals(other: Cents): boolean {
    return this._value === other.getValue();
  }

  add(other: Cents): Cents {
    return new Cents(this._value + other.getValue());
  }

  subtract(other: Cents): Cents {
    return new Cents(this._value - other.getValue());
  }
}
