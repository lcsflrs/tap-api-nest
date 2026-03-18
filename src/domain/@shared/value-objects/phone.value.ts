import { ValueObject } from "../interfaces/value-object.interface";

export class Phone implements ValueObject<string> {
  private readonly _value: string;

  constructor(value: string) {
    const sanitized = value.replace(/\D/g, "");

    if (!Phone.isValid(sanitized)) {
      throw new Error("Invalid phone");
    }

    this._value = sanitized;
  }

  static create(value: string): Phone {
    return new Phone(value);
  }

  getValue(): string {
    return this._value;
  }

  equals(other: Phone): boolean {
    return this._value === other.getValue();
  }

  iopayFormat(): string {
    return `(${this._value.slice(0, 2)})${this._value.slice(2)}`;
  }

  private static isValid(phone: string): boolean {
    return /^\d{11}$/.test(phone) && phone[2] === "9";
  }
}
