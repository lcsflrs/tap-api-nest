import { ValueObject } from "@domain/@shared/interfaces/value-object.interface";

export class WorkerType implements ValueObject<string> {
  static readonly READER = new WorkerType("READER", 1);
  static readonly MOUNTER = new WorkerType("MOUNTER", 2);
  static readonly MANAGER = new WorkerType("MANAGER", 3);
  static readonly CASHIER = new WorkerType("CASHIER", 4);

  private static readonly VALID_TYPES = [
    "READER",
    "MOUNTER",
    "MANAGER",
    "CASHIER",
  ] as const;

  private constructor(
    private readonly value: string,
    private readonly numericValue: number,
  ) {}

  static fromString(value: string): WorkerType {
    const upperValue = value.toUpperCase();

    if (!WorkerType.isValid(upperValue)) {
      throw new Error("Invalid worker type");
    }

    switch (upperValue) {
      case "READER":
        return WorkerType.READER;
      case "MOUNTER":
        return WorkerType.MOUNTER;
      case "MANAGER":
        return WorkerType.MANAGER;
      case "CASHIER":
        return WorkerType.CASHIER;
      default:
        throw new Error("Invalid worker type");
    }
  }

  static fromNumber(value: number): WorkerType {
    switch (value) {
      case 1:
        return WorkerType.READER;
      case 2:
        return WorkerType.MOUNTER;
      case 3:
        return WorkerType.MANAGER;
      case 4:
        return WorkerType.CASHIER;
      default:
        throw new Error("Invalid worker type numeric value");
    }
  }

  private static isValid(value: string): boolean {
    return WorkerType.VALID_TYPES.includes(value as any);
  }

  canManageWorkers(): boolean {
    return this === WorkerType.MANAGER;
  }

  getValue(): string {
    return this.value;
  }

  getNumericValue(): number {
    return this.numericValue;
  }

  equals(other: this): boolean {
    return this.value === other.value;
  }

  isReader(): boolean {
    return this === WorkerType.READER;
  }

  isMounter(): boolean {
    return this === WorkerType.MOUNTER;
  }

  isManager(): boolean {
    return this === WorkerType.MANAGER;
  }

  isCashier(): boolean {
    return this === WorkerType.CASHIER;
  }

  toString(): string {
    return this.value;
  }
}
