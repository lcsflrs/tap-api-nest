import { ValueObject } from "@domain/@shared/interfaces/value-object.interface";

export class ProductContainer implements ValueObject<string> {
  constructor(private readonly _value: string) {}

  static create(value: string): ProductContainer {
    if (value.trim().length === 0) {
      throw new Error("Product container is required");
    }

    return new ProductContainer(value);
  }

  getValue(): string {
    return this._value;
  }

  equals(other: ProductContainer): boolean {
    return this._value === other.getValue();
  }
}
