import { AggregateRoot } from "@domain/@shared/interfaces/aggregate-root.abstract";
import {
  Address,
  AddressJSON,
} from "@domain/@shared/value-objects/address.value";
import { Cpf } from "@domain/@shared/value-objects/cpf.value";
import { Email } from "@domain/@shared/value-objects/email.value";
import { Phone } from "@domain/@shared/value-objects/phone.value";
import { AccessUserID } from "@domain/access-user/access-user-id.value";
import { OwnerID } from "./owner-id.value";
import { Shop } from "../store/shop.entity";
import { Store, StoreJSON } from "@domain/store/store.aggregate";

export class Owner extends AggregateRoot<OwnerID> {
  constructor(
    id: OwnerID,
    private readonly _name: string,
    private readonly _lastName: string,
    private readonly _document: Cpf | undefined,
    private readonly _email: Email,
    private readonly _phone: Phone,
    private readonly _birthdate: Date | undefined,
    private readonly _address: Address,
    private _isActive: boolean = true,
    private _emailVerified: boolean = false,
    private _phoneVerified: boolean = false,
    private _ioCustomerId?: string,
    private _accessUserId?: AccessUserID,
    private _stores: Store[] = [],
  ) {
    super(id);
  }

  static create(
    id: OwnerID,
    name: string,
    lastName: string,
    document: Cpf | undefined,
    email: Email,
    phone: Phone,
    birthdate: Date | undefined,
    address: Address,
  ): Owner {
    if (name.trim().length === 0) {
      throw new Error("Name is required");
    }

    if (lastName.trim().length === 0) {
      throw new Error("Last name is required");
    }

    return new Owner(
      id,
      name,
      lastName,
      document,
      email,
      phone,
      birthdate,
      address,
    );
  }

  static fromJSON(json: OwnerJSON): Owner {
    return new Owner(
      new OwnerID(json.id),
      json.name,
      json.lastName,
      json.document !== undefined ? Cpf.create(json.document) : undefined,
      Email.create(json.email),
      Phone.create(json.phone),
      json.birthdate !== undefined ? new Date(json.birthdate) : undefined,
      Address.fromJSON(json.address),
      json.isActive,
      json.emailVerified,
      json.phoneVerified,
      json.ioCustomerId,
      json.accessUserId !== undefined
        ? new AccessUserID(json.accessUserId)
        : undefined,
      json.stores?.map((s) => Store.fromJSON(s)) ?? [],
    );
  }

  toJSON(): OwnerJSON {
    return {
      id: this.id.getValue(),
      name: this._name,
      lastName: this._lastName,
      document: this._document?.getValue(),
      email: this._email.getValue(),
      phone: this._phone.getValue(),
      birthdate: this._birthdate?.toISOString(),
      address: this._address.toJSON(),
      isActive: this._isActive,
      emailVerified: this._emailVerified,
      phoneVerified: this._phoneVerified,
      ioCustomerId: this._ioCustomerId,
      accessUserId: this._accessUserId?.getValue(),
      stores: this._stores.map((s) => s.toJSON()),
    };
  }

  addStore(store: Store): void {
    if (!this._isActive) {
      throw new Error("Owner is not active.");
    }

    if (store.isPF() && this._stores.some((s) => s.isPF())) {
      throw new Error("Owner already has a PF store.");
    }

    if (
      store.isPJ() &&
      this._stores.some(
        (s) =>
          s.businessDocument?.getValue() === store.businessDocument?.getValue(),
      )
    ) {
      throw new Error("Owner already has this Store PJ document.");
    }

    if (store.ownerId.getValue() !== this.id.getValue()) {
      throw new Error("Store must have the same owner.");
    }

    this._stores.push(store);
  }

  addShopToStore(store: Store, shop: Shop): void {
    if (!this._isActive) {
      throw new Error("Owner is not active.");
    }

    const storeIndex = this._stores.findIndex(
      (s) => s.storeId.getValue() === store.storeId.getValue(),
    );

    if (storeIndex === -1) {
      throw new Error("Store not found in owner's stores.");
    }

    this._stores[storeIndex].addShop(shop);
  }

  get accessUserId(): AccessUserID {
    if (!this._accessUserId) {
      throw new Error("AccessUserId is not set.");
    }

    return this._accessUserId;
  }

  get name(): string {
    return this._name;
  }

  get lastName(): string {
    return this._lastName;
  }

  get document(): Cpf | undefined {
    return this._document;
  }

  get email(): Email {
    return this._email;
  }

  get phone(): Phone {
    return this._phone;
  }

  get birthdate(): Date | undefined {
    return this._birthdate;
  }

  get address(): Address {
    return this._address;
  }

  get ioCustomerId(): string | undefined {
    return this._ioCustomerId;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get emailVerified(): boolean {
    return this._emailVerified;
  }

  get phoneVerified(): boolean {
    return this._phoneVerified;
  }

  get stores(): Store[] {
    return [...this._stores];
  }

  set stores(value: Store[]) {
    this._stores = value;
  }

  verifyEmail(): void {
    this._emailVerified = true;
  }

  verifyPhone(): void {
    this._phoneVerified = true;
  }
}

export interface OwnerJSON {
  id: number;
  name: string;
  lastName: string;
  document?: string;
  email: string;
  phone: string;
  birthdate?: string;
  address: AddressJSON;
  isActive: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  ioCustomerId?: string;
  accessUserId?: number;
  stores?: StoreJSON[];
}
