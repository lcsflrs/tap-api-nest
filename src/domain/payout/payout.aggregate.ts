import { AggregateRoot } from "../@shared/interfaces/aggregate-root.abstract.";
import { Uuid } from "../@shared/interfaces/uuid";
import { PayoutItem } from "./payout-item.entity";
import { PayoutStatus } from "../@shared/value-objects/payout-status.value";
import { Money } from "../@shared/value-objects/money.value";

export class Payout extends AggregateRoot {
  constructor(
    id: Uuid,
    private _clientId: Uuid,
    private _grossInCents: Money,
    private _feeInCents: Money,
    private _netInCents: Money,
    private _status: PayoutStatus,
    private _items: PayoutItem[] = [],
    private readonly _createdAt: Date,
    private _updatedAt: Date,
    private _paidAt?: Date,
    private _proofFileUrl?: string,
  ) {
    super(id);
  }

  static create(clientId: Uuid, grossInCents: Money): Payout {
    const feeInCents = grossInCents.multiply(0.03);
    const netInCents = grossInCents.subtract(feeInCents);

    return new Payout(
      Uuid.generate(),
      clientId,
      grossInCents,
      feeInCents,
      netInCents,
      PayoutStatus.PENDING,
      [],
      new Date(),
      new Date(),
      undefined,
      undefined,
    );
  }

  addItem(payoutItem: PayoutItem): void {
    if (this._status.isPaid()) {
      throw new Error("Cannot add item to paid payout");
    }

    if (
      this._items.some((item) =>
        item.consumptionId.equals(payoutItem.consumptionId),
      )
    ) {
      throw new Error("Consumption already associated with this payout");
    }

    this._items.push(payoutItem);
    this._grossInCents = this._grossInCents.add(payoutItem.amountInCents);
    this._feeInCents = this._grossInCents.multiply(0.03);
    this._netInCents = this._grossInCents.subtract(this._feeInCents);
    this.touch();
  }

  markAsPaid(proofFileUrl: string): void {
    if (this._status.isPaid()) {
      throw new Error("Payout already paid");
    }

    if (this._items.length === 0) {
      throw new Error("Cannot mark payout as paid without items");
    }

    if (!proofFileUrl || proofFileUrl.trim().length === 0) {
      throw new Error("Proof file URL is required");
    }

    this._status = PayoutStatus.PAID;
    this._paidAt = new Date();
    this._proofFileUrl = proofFileUrl;
    this.touch();
  }

  static fromJSON(json: any): Payout {
    const payout = new Payout(
      new Uuid(json.id),
      new Uuid(json.clientId),
      Money.create(json.grossInCents),
      Money.create(json.feeInCents),
      Money.create(json.netInCents),
      PayoutStatus.fromString(json.status),
      [],
      json.createdAt,
      json.updatedAt,
      json.paidAt ? new Date(json.paidAt) : undefined,
      json.proofFileUrl,
    );

    payout._items = json.items.map((item: any) => PayoutItem.fromJSON(item));

    return payout;
  }

  get clientId(): Uuid {
    return this._clientId;
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

  get paidAt(): Date | undefined {
    return this._paidAt;
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
