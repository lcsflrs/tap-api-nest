import { ValueObject } from "../interfaces/value-object.interface";

export class Cpf implements ValueObject<string> {
  constructor(private readonly _value: string) {
    const sanitized = _value.replace(/\D/g, "");

    if (!Cpf.isValid(sanitized)) {
      throw new Error("Invalid CPF");
    }

    this._value = sanitized;
  }

  static create(value: string): Cpf {
    return new Cpf(value);
  }

  getValue(): string {
    return this._value;
  }

  equals(other: Cpf): boolean {
    return this._value === other.getValue();
  }

  private static isValid(cpf: string): boolean {
    if (cpf.length !== 11) {
      return false;
    }

    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let digit = 11 - (sum % 11);
    if (digit > 9) {
      digit = 0;
    }

    if (parseInt(cpf.charAt(9)) !== digit) {
      return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }

    digit = 11 - (sum % 11);
    if (digit > 9) {
      digit = 0;
    }

    if (parseInt(cpf.charAt(10)) !== digit) {
      return false;
    }

    return true;
  }
}
