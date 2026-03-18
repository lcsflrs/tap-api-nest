import { ValueObject } from "../interfaces/value-object.interface";

export class Cnpj implements ValueObject<string> {
  constructor(private readonly _value: string) {
    const sanitized = _value.replace(/\D/g, "");

    if (!Cnpj.isValid(sanitized)) {
      throw new Error("Invalid CNPJ");
    }

    this._value = sanitized;
  }

  static create(value: string): Cnpj {
    return new Cnpj(value);
  }

  getValue(): string {
    return this._value;
  }

  equals(other: Cnpj): boolean {
    return this._value === other.getValue();
  }

  private static isValid(cnpj: string): boolean {
    if (cnpj.length !== 14) {
      return false;
    }

    if (/^(\d)\1+$/.test(cnpj)) {
      return false;
    }

    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    const digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += Number(numbers.charAt(size - i)) * pos--;

      if (pos < 2) {
        pos = 9;
      }
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== Number(digits.charAt(0))) {
      return false;
    }

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += Number(numbers.charAt(size - i)) * pos--;

      if (pos < 2) {
        pos = 9;
      }
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === Number(digits.charAt(1));
  }
}
