import { ValueObject } from "@domain/@shared/interfaces/value-object.interface";

export type PixTypeValue = "AddBalance" | "BuyTicket" | "StoreSale";

export class PixType implements ValueObject<string> {
  private constructor(private readonly _value: PixTypeValue) {}

  static addBalance(): PixType {
    return new PixType("AddBalance");
  }

  static buyTicket(): PixType {
    return new PixType("BuyTicket");
  }

  static storeSale(): PixType {
    return new PixType("StoreSale");
  }

  static from(value: string): PixType {
    if (
      value !== "AddBalance" &&
      value !== "BuyTicket" &&
      value !== "StoreSale"
    ) {
      throw new Error(`Invalid pix type: ${value}`);
    }

    return new PixType(value as PixTypeValue);
  }

  isAddBalance(): boolean {
    return this._value === "AddBalance";
  }

  isBuyTicket(): boolean {
    return this._value === "BuyTicket";
  }

  isStoreSale(): boolean {
    return this._value === "StoreSale";
  }

  getValue(): string {
    return this._value;
  }

  equals(other: PixType): boolean {
    return this._value === other._value;
  }
}
