import { AggregateRoot } from "../@shared/interfaces/aggregate-root.abstract";
import { Uuid } from "../@shared/interfaces/uuid";
import { PayoutItem, PayoutItemJSON } from "./payout-item.entity";
import { PayoutStatus } from "./payout-status.value";
import { Money } from "../@shared/value-objects/money.value";

export class Payout extends AggregateRoot<Uuid> {
  constructor(
    id: Uuid,
    private readonly _storeId: number,
    private readonly _storeName: string,
    private _grossInCents: Money,
    private _feeInCents: Money,
    private _netInCents: Money,
    private _status: PayoutStatus,
    private _items: PayoutItem[] = [],
    private readonly _proofFileUrl?: string,
  ) {
    super(id);
  }

  static create(
    storeId: number,
    storeName: string,
    proofFileUrl: string,
  ): Payout {
    if (storeId <= 0) {
      throw new Error("Invalid store ID");
    }

    if (storeName.trim().length === 0) {
      throw new Error("Store name cannot be empty");
    }

    if (!proofFileUrl || proofFileUrl.trim().length === 0) {
      throw new Error("Proof file URL is required");
    }

    const now = new Date();

    return new Payout(
      Uuid.generate(),
      storeId,
      storeName,
      Money.create(0),
      Money.create(0),
      Money.create(0),
      PayoutStatus.PAID,
      [],
      proofFileUrl,
    );
  }

  static fromJSON(json: PayoutJSON): Payout {
    const payout = new Payout(
      new Uuid(json.id),
      json.storeId,
      json.storeName,
      Money.create(json.grossInCents),
      Money.create(json.feeInCents),
      Money.create(json.netInCents),
      PayoutStatus.fromString(json.status),
      [],
      json.proofFileUrl,
    );

    if (json.items) {
      payout._items = json.items.map((item) => PayoutItem.fromJSON(item));
    }

    return payout;
  }

  toJSON(): PayoutJSON {
    return {
      id: this.id.getValue(),
      storeId: this._storeId,
      storeName: this._storeName,
      grossInCents: this._grossInCents.getValue(),
      feeInCents: this._feeInCents.getValue(),
      netInCents: this._netInCents.getValue(),
      status: this._status.toString(),
      items: this._items.map((item) => item.toJSON()),
      proofFileUrl: this._proofFileUrl,
    };
  }

  addItems(items: PayoutItem[]): void {
    if (items.length === 0) {
      throw new Error("Must provide at least one item");
    }

    if (this._items.length > 0) {
      throw new Error("Items have already been added to this payout");
    }

    const storeSaleIds = new Set(items.map((item) => item.storeSaleId));
    if (storeSaleIds.size !== items.length) {
      throw new Error("Duplicate store sales in payout items");
    }

    const invalidItems = items.filter((item) => !item.payoutId.equals(this.id));
    if (invalidItems.length > 0) {
      throw new Error("All items must belong to this payout");
    }

    this._items = [...items];

    this._grossInCents = items.reduce(
      (sum, item) => sum.add(item.saleGrossInCents),
      Money.create(0),
    );

    this._feeInCents = items.reduce(
      (sum, item) => sum.add(item.saleFeeInCents),
      Money.create(0),
    );

    this._netInCents = items.reduce(
      (sum, item) => sum.add(item.saleNetInCents),
      Money.create(0),
    );
  }

  getId(): Uuid {
    return this.id;
  }

  get storeId(): number {
    return this._storeId;
  }

  get storeName(): string {
    return this._storeName;
  }

  get grossInCents(): number {
    return this._grossInCents.getValue();
  }

  get feeInCents(): number {
    return this._feeInCents.getValue();
  }

  get netInCents(): number {
    return this._netInCents.getValue();
  }

  get status(): PayoutStatus {
    return this._status;
  }

  get proofFileUrl(): string | undefined {
    return this._proofFileUrl;
  }

  get items(): PayoutItem[] {
    return [...this._items];
  }
}

interface PayoutJSON {
  id: string;
  storeId: number;
  storeName: string;
  grossInCents: number;
  feeInCents: number;
  netInCents: number;
  status: string;
  proofFileUrl?: string;
  items?: PayoutItemJSON[];
}
