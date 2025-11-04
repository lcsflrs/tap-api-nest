import { Entity } from "../@shared/interfaces/entity.abstract";
import { Uuid } from "../@shared/interfaces/uuid";
import { Money } from "../@shared/value-objects/money.value";

export class PayoutItem extends Entity {
  constructor(
    id: Uuid,
    private _payoutId: Uuid,
    private _amountInCents: Money,
    private _consumptionId: Uuid,
  ) {
    super(id);
  }

  static create(
    payoutId: Uuid,
    amountInCents: Money,
    consumptionId: Uuid,
  ): PayoutItem {
    return new PayoutItem(
      Uuid.generate(),
      payoutId,
      amountInCents,
      consumptionId,
    );
  }

  equals(other: PayoutItem): boolean {
    return (
      this.id.equals(other.id) &&
      this._payoutId.equals(other._payoutId) &&
      this._amountInCents.equals(other._amountInCents) &&
      this._consumptionId.equals(other._consumptionId)
    );
  }

  get payoutId(): Uuid {
    return this._payoutId;
  }

  get amountInCents(): Money {
    return this._amountInCents;
  }

  get consumptionId(): Uuid {
    return this._consumptionId;
  }
}
