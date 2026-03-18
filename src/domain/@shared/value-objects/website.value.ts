import { ValueObject } from "../interfaces/value-object.interface";

export class Website implements ValueObject<string> {
  constructor(private readonly _value: string) {
    if (!Website.isValidFormat(_value)) {
      throw new Error("Invalid website format");
    }
  }

  static create(value: string): Website {
    return new Website(value);
  }

  getValue(): string {
    return this._value;
  }

  equals(other: Website): boolean {
    return this._value === other.getValue();
  }

  private static isValidFormat(value: string): boolean {
    const regex = /^(http|https):\/\/[^ "]+$/;
    return regex.test(value);
  }
}
