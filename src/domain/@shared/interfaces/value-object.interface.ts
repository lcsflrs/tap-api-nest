export interface ValueObject<T> {
  equals(other: this): boolean;
  getValue(): T;
}
