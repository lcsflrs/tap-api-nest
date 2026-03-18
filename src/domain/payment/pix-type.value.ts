import { ValueObject } from "@domain/@shared/interfaces/value-object.interface";

export type PixTypeValue = "AddBalance" | "BuyTicket";

export class PixType implements ValueObject<string> {
  private constructor(private readonly _value: PixTypeValue) {}

  static addBalance(): PixType {
    return new PixType("AddBalance");
  }

  static buyTicket(): PixType {
    return new PixType("BuyTicket");
  }

  static from(value: string): PixType {
    if (value !== "AddBalance" && value !== "BuyTicket") {
      throw new Error(`Invalid pix type: ${value}`);
    }

    return new PixType(value);
  }

  isAddBalance(): boolean {
    return this._value === "AddBalance";
  }

  isBuyTicket(): boolean {
    return this._value === "BuyTicket";
  }

  getValue(): string {
    return this._value;
  }

  equals(other: PixType): boolean {
    return this._value === other._value;
  }
}
