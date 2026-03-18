import { ValueObject } from "../interfaces/value-object.interface";

export class StringID implements ValueObject<string> {
  constructor(protected readonly value: string) {
    if (value.trim().length === 0) {
      throw new Error("ID cannot be empty");
    }

    this.value = value;
  }

  static create(value: string): StringID {
    return new StringID(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: this): boolean {
    if (!other) {
      return false;
    }

    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
