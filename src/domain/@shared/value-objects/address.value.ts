import { ValueObject } from "../interfaces/value-object.interface";

export class Address implements ValueObject<AddressJSON> {
  constructor(
    private readonly _line1: string,
    private readonly _line2: string,
    private readonly _line3: string,
    private readonly _neighborhood: string,
    private readonly _city: string,
    private readonly _state: string,
    private readonly _countryCode: string,
    private readonly _zipCode: string,
  ) {}

  static create(
    line1: string,
    line2: string,
    line3: string,
    neighborhood: string,
    city: string,
    state: string,
    countryCode: string,
    zipCode: string,
  ): Address {
    if (line1.trim().length === 0) {
      throw new Error("Address street is required");
    }

    if (city.trim().length === 0) {
      throw new Error("City is required");
    }

    if (state.trim().length === 0) {
      throw new Error("State is required");
    }

    if (zipCode.trim().length === 0) {
      throw new Error("Zip code is required");
    }

    if (countryCode.trim().length === 0) {
      throw new Error("Country code is required");
    }

    return new Address(
      line1,
      line2,
      line3,
      neighborhood,
      city,
      state,
      countryCode,
      zipCode,
    );
  }

  static fromJSON(json: AddressJSON): Address {
    return Address.create(
      json.line1,
      json.line2,
      json.line3,
      json.neighborhood,
      json.city,
      json.state,
      json.countryCode,
      json.zipCode,
    );
  }

  getValue(): AddressJSON {
    return this.toJSON();
  }

  toJSON(): AddressJSON {
    return {
      line1: this._line1,
      line2: this._line2,
      line3: this._line3,
      neighborhood: this._neighborhood,
      city: this._city,
      state: this._state,
      countryCode: this._countryCode,
      zipCode: this._zipCode,
    };
  }

  equals(other: Address): boolean {
    return (
      this._line1 === other._line1 &&
      this._line2 === other._line2 &&
      this._line3 === other._line3 &&
      this._neighborhood === other._neighborhood &&
      this._city === other._city &&
      this._state === other._state &&
      this._countryCode === other._countryCode &&
      this._zipCode === other._zipCode
    );
  }

  get street(): string {
    return this._line1;
  }

  get number(): string {
    return this._line2;
  }

  get complement(): string {
    return this._line3;
  }

  get line1(): string {
    return this._line1;
  }

  get line2(): string {
    return this._line2;
  }

  get line3(): string {
    return this._line3;
  }

  get neighborhood(): string {
    return this._neighborhood;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get countryCode(): string {
    return this._countryCode;
  }

  get zipCode(): string {
    return this._zipCode;
  }
}

export interface AddressJSON {
  line1: string;
  line2: string;
  line3: string;
  neighborhood: string;
  city: string;
  state: string;
  countryCode: string;
  zipCode: string;
}
