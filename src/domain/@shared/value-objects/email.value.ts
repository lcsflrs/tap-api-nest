import { ValueObject } from "../interfaces/value-object.interface";

export class Email implements ValueObject<string> {
  constructor(private readonly _value: string) {
    if (_value.length < 5 || _value.length > 100) {
      throw new Error("Email must be between 5 and 100 characters");
    }

    if (!Email.isValidFormat(_value)) {
      throw new Error("Invalid email format");
    }
  }

  static create(value: string): Email {
    return new Email(value);
  }

  getValue(): string {
    return this._value;
  }

  equals(other: Email): boolean {
    return this._value === other.getValue();
  }

  private static isValidFormat(email: string): boolean {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }
}
