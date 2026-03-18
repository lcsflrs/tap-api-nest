import { AggregateRoot } from "@domain/@shared/interfaces/aggregate-root.abstract";
import { StoreID } from "./store-id.value";
import { OwnerID } from "../owner/owner-id.value";
import { Email } from "@domain/@shared/value-objects/email.value";
import { Phone } from "@domain/@shared/value-objects/phone.value";
import {
  Address,
  AddressJSON,
} from "@domain/@shared/value-objects/address.value";
import { Cnpj } from "@domain/@shared/value-objects/cnpj.value";
import { Website } from "@domain/@shared/value-objects/website.value";
import { Shop, ShopJSON } from "./shop.entity";

export class Store extends AggregateRoot<StoreID> {
  constructor(
    id: StoreID,
    private readonly _ownerId: OwnerID,
    private readonly _name: string,
    private readonly _mcc: number | null,
    private readonly _statementDescriptor: string | null,
    private _phone?: Phone,
    private _address?: Address,
    private _businessDocument?: Cnpj,
    private _email?: Email,
    private _businessName?: string,
    private _website?: Website,
    private _openDate?: Date,
    private _paymentData?: PaymentData,
    private _webhookUrl?: string,
    private _shops: Shop[] = [],
  ) {
    super(id);
  }

  static create(
    storeId: StoreID,
    ownerId: OwnerID,
    name: string,
    mcc: number | null,
    statementDescriptor: string | null,
    pjData?: PJData,
    paymentData?: PaymentData,
  ): Store {
    if (name.trim().length < 2 || name.trim().length > 120) {
      throw new Error("Store name must be between 2 and 120 characters");
    }

    if (pjData) {
      if (!pjData.phone) {
        throw new Error("Phone is required for PJ store");
      }

      if (!pjData.document) {
        throw new Error("Document is required for PJ store");
      }

      if (!pjData.email) {
        throw new Error("Email is required for PJ store");
      }

      if (!pjData.address) {
        throw new Error("Address is required for PJ store");
      }

      if (!pjData.website) {
        throw new Error("Website is required for PJ store");
      }
      if (!pjData.openDate) {
        throw new Error("Open date is required for PJ store");
      }

      if (
        pjData.businessName.trim().length < 2 ||
        pjData.businessName.trim().length > 255
      ) {
        throw new Error("Business name must be between 2 and 255 characters");
      }
    }

    if (paymentData) {
      Store.validatePaymentData(paymentData);
    }

    return new Store(
      storeId,
      ownerId,
      name,
      mcc,
      statementDescriptor,
      pjData?.phone,
      pjData?.address,
      pjData?.document,
      pjData?.email,
      pjData?.businessName,
      pjData?.website,
      pjData?.openDate,
      paymentData,
      undefined,
    );
  }

  static fromJSON(json: StoreJSON): Store {
    return new Store(
      new StoreID(json.storeId),
      new OwnerID(json.ownerId),
      json.name,
      json.mcc ?? null,
      json.statementDescriptor ?? null,
      json.phone !== undefined ? Phone.create(json.phone) : undefined,
      json.address !== undefined ? Address.fromJSON(json.address) : undefined,
      json.businessDocument !== undefined
        ? Cnpj.create(json.businessDocument)
        : undefined,
      json.email !== undefined ? Email.create(json.email) : undefined,
      json.businessName,
      json.website !== undefined ? Website.create(json.website) : undefined,
      json.openDate !== undefined ? new Date(json.openDate) : undefined,
      json.paymentData,
      json.webhookUrl,
      json.shops?.map((s) => Shop.fromJSON(s)) ?? [],
    );
  }

  toJSON(): StoreJSON {
    return {
      storeId: this.id.getValue(),
      ownerId: this._ownerId.getValue(),
      name: this._name,
      mcc: this._mcc,
      statementDescriptor: this._statementDescriptor,
      phone: this._phone?.getValue(),
      address: this._address?.toJSON(),
      businessDocument: this._businessDocument?.getValue(),
      email: this._email?.getValue(),
      businessName: this._businessName,
      website: this._website?.getValue(),
      openDate: this._openDate?.toISOString(),
      paymentData: this._paymentData,
      webhookUrl: this._webhookUrl,
      shops: this._shops.map((s) => s.toJSON()),
    };
  }

  addShop(shop: Shop): void {
    if (this._shops.some((s) => s.internalName === shop.internalName)) {
      throw new Error("Shop internal name already exists");
    }

    if (
      this._shops.some((s) => s.shopId.getValue() === shop.shopId.getValue())
    ) {
      throw new Error("Shop already exists");
    }

    this._shops.push(shop);
  }

  private static validatePaymentData(value: PaymentData): void {
    if (!value.ioSellerId.trim()) {
      throw new Error("ioSellerId cannot be empty");
    }
    if (!value.taxpayerId.trim()) {
      throw new Error("taxpayerId cannot be empty");
    }
  }

  canTransfer(): boolean {
    return !!this._paymentData?.ioSellerId;
  }

  hasWebhook(): boolean {
    return !!this._webhookUrl;
  }

  isPF(): boolean {
    return !this._businessDocument;
  }

  isPJ(): boolean {
    return !!this._businessDocument;
  }

  get storeId(): StoreID {
    return this.id;
  }

  get ownerId(): OwnerID {
    return this._ownerId;
  }

  get name(): string {
    return this._name;
  }

  get mcc(): number | null {
    return this._mcc;
  }

  get statementDescriptor(): string | null {
    return this._statementDescriptor;
  }

  get phone(): Phone | undefined {
    return this._phone;
  }

  get address(): Address | undefined {
    return this._address;
  }

  get businessDocument(): Cnpj | undefined {
    return this._businessDocument;
  }

  get email(): Email | undefined {
    return this._email;
  }

  get businessName(): string | undefined {
    return this._businessName;
  }

  get website(): Website | undefined {
    return this._website;
  }

  get openDate(): Date | undefined {
    return this._openDate;
  }

  get paymentData(): PaymentData | undefined {
    return this._paymentData;
  }

  get webhookUrl(): string | undefined {
    return this._webhookUrl;
  }

  get shops(): Shop[] {
    return [...this._shops];
  }
}

export interface PJData {
  phone: Phone;
  document: Cnpj;
  email: Email;
  businessName: string;
  website: Website;
  openDate: Date;
  address: Address;
}

export interface PaymentData {
  ioSellerId: string;
  taxpayerId: string;
  ownerTaxpayerId?: string;
}

export interface StoreJSON {
  storeId: number;
  ownerId: number;
  name: string;
  mcc?: number | null;
  statementDescriptor?: string | null;
  phone?: string;
  address?: AddressJSON;
  businessDocument?: string;
  email?: string;
  businessName?: string;
  website?: string;
  openDate?: string;
  paymentData?: PaymentData;
  webhookUrl?: string;
  shops?: ShopJSON[];
}
