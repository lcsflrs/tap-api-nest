import { AggregateRoot } from "../@shared/interfaces/aggregate-root.abstract.";
import { Uuid } from "../@shared/interfaces/uuid";
import { PayoutItem } from "./payout-item.entity";
import { PayoutStatus } from "../@shared/value-objects/payout-status.value";
import { Money } from "../@shared/value-objects/money.value";

export class Payout extends AggregateRoot {
  constructor(
    id: Uuid,
    private _storeId: number,
    private _storeName: string,
    private _grossInCents: Money,
    private _feeInCents: Money,
    private _netInCents: Money,
    private _status: PayoutStatus,
    private _items: PayoutItem[] = [],
    private readonly _createdAt: Date,
    private _updatedAt: Date,
    private _proofFileUrl?: string,
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

    const createdAt = new Date();

    return new Payout(
      Uuid.generate(),
      storeId,
      storeName,
      Money.create(0),
      Money.create(0),
      Money.create(0),
      PayoutStatus.PAID,
      [],
      createdAt,
      new Date(),
      proofFileUrl,
    );
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

    this.touch();
  }

  static fromJSON(json: any): Payout {
    const payout = new Payout(
      new Uuid(json.id),
      json.storeId,
      json.storeName,
      Money.create(json.grossInCents),
      Money.create(json.feeInCents),
      Money.create(json.netInCents),
      PayoutStatus.fromString(json.status),
      [],
      new Date(json.createdAt),
      new Date(json.updatedAt),
      json.proofFileUrl,
    );

    if (json.items) {
      payout._items = json.items.map((item: any) => PayoutItem.fromJSON(item));
    }

    return payout;
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

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  private touch(): void {
    this._updatedAt = new Date();
  }
}
