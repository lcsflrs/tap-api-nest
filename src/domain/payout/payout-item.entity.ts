import { Entity } from "../@shared/interfaces/entity.abstract";
import { Uuid } from "../@shared/interfaces/uuid";
import { Money } from "../@shared/value-objects/money.value";

export class PayoutItem extends Entity<Uuid> {
  private static readonly TAP_FEE_RATE = 0.03;

  constructor(
    id: Uuid,
    private _payoutId: Uuid,
    private _storeSaleId: number,
    private _orderId: string,
    private _saleGrossInCents: Money,
    private _saleFeeInCents: Money,
    private _saleNetInCents: Money,
  ) {
    super(id);
  }

  static create(
    payoutId: Uuid,
    storeSaleId: number,
    orderId: string,
    saleGrossInCents: Money,
  ): PayoutItem {
    if (storeSaleId <= 0) {
      throw new Error("Invalid store sale ID");
    }

    if (orderId.trim().length === 0) {
      throw new Error("Order ID cannot be empty");
    }

    if (saleGrossInCents.getValue() <= 0) {
      throw new Error("Sale amount must be greater than zero");
    }

    const saleFeeInCents = saleGrossInCents.multiply(this.TAP_FEE_RATE);
    const saleNetInCents = saleGrossInCents.subtract(saleFeeInCents);

    return new PayoutItem(
      Uuid.generate(),
      payoutId,
      storeSaleId,
      orderId,
      saleGrossInCents,
      saleFeeInCents,
      saleNetInCents,
    );
  }

  equals(other: PayoutItem): boolean {
    return (
      this.id.equals(other.id) &&
      this._payoutId.equals(other._payoutId) &&
      this._storeSaleId === other._storeSaleId &&
      this._orderId === other._orderId &&
      this._saleGrossInCents.equals(other._saleGrossInCents)
    );
  }

  static fromJSON(json: PayoutItemJSON): PayoutItem {
    return new PayoutItem(
      new Uuid(json.id),
      new Uuid(json.payoutId),
      json.storeSaleId,
      json.orderId,
      Money.create(json.saleGrossInCents),
      Money.create(json.saleFeeInCents),
      Money.create(json.saleNetInCents),
    );
  }

  toJSON(): PayoutItemJSON {
    return {
      id: this.id.getValue(),
      payoutId: this._payoutId.getValue(),
      storeSaleId: this._storeSaleId,
      orderId: this._orderId,
      saleGrossInCents: this._saleGrossInCents.getValue(),
      saleFeeInCents: this._saleFeeInCents.getValue(),
      saleNetInCents: this._saleNetInCents.getValue(),
    };
  }

  get payoutId(): Uuid {
    return this._payoutId;
  }

  get storeSaleId(): number {
    return this._storeSaleId;
  }

  get orderId(): string {
    return this._orderId;
  }

  get saleGrossInCents(): Money {
    return this._saleGrossInCents;
  }

  get saleFeeInCents(): Money {
    return this._saleFeeInCents;
  }

  get saleNetInCents(): Money {
    return this._saleNetInCents;
  }
}

export interface PayoutItemJSON {
  id: string;
  payoutId: string;
  storeSaleId: number;
  orderId: string;
  saleGrossInCents: number;
  saleFeeInCents: number;
  saleNetInCents: number;
}
