import { AggregateRoot } from "../@shared/interfaces/aggregate-root.abstract.";
import { Uuid } from "../@shared/interfaces/uuid";
import { Money } from "../@shared/value-objects/money.value";

export class Adjustment extends AggregateRoot {
  constructor(
    id: Uuid,
    private _clientId: Uuid,
    private _valueInCents: Money,
    private _reason: string,
    private _createdAt: Date = new Date(),
    private _attachment?: string,
  ) {
    super(id);
  }

  static create(
    clientId: Uuid,
    valueInCents: Money,
    reason: string,
    attachment?: string,
  ): Adjustment {
    if (reason.trim().length === 0) {
      throw new Error("Adjustment reason cannot be empty");
    }

    if (reason.length > 500) {
      throw new Error("Adjustment reason is too long");
    }

    return new Adjustment(
      Uuid.generate(),
      clientId,
      valueInCents,
      reason,
      new Date(),
      attachment,
    );
  }

  get clientId(): Uuid {
    return this._clientId;
  }

  get valueInCents(): Money {
    return this._valueInCents;
  }

  get reason(): string {
    return this._reason;
  }

  get attachment(): string | undefined {
    return this._attachment;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
}
