import { ValueObject } from "@domain/@shared/interfaces/value-object.interface";

export class ProductCategory implements ValueObject<string> {
  constructor(private readonly _value: string) {}

  static create(value: string): ProductCategory {
    if (value.trim().length === 0) {
      throw new Error("Product category is required");
    }

    return new ProductCategory(value);
  }

  getValue(): string {
    return this._value;
  }

  equals(other: ProductCategory): boolean {
    return this._value === other.getValue();
  }
}
