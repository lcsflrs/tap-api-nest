import { uuidv7 } from "uuidv7";
import { validate } from "uuid";
import type { ValueObject } from "./value-object.interface";

export class Uuid implements ValueObject<string> {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValidUuid(value);
  }

  static generate(): Uuid {
    return new Uuid(uuidv7());
  }

  private ensureIsValidUuid(id: string): void {
    if (!validate(id)) {
      throw new Error("Invalid uuid format");
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: this): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
