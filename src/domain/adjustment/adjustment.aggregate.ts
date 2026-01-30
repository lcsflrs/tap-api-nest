import { AggregateRoot } from "../@shared/interfaces/aggregate-root.abstract.";
import { Uuid } from "../@shared/interfaces/uuid";
import { Money } from "../@shared/value-objects/money.value";

export type AdjustmentType = "CREDIT" | "DEBIT";

export class Adjustment extends AggregateRoot {
  constructor(
    id: Uuid,
    private _valueInCents: Money,
    private _reason: string,
    private _type: AdjustmentType,
    private _createdAt: Date = new Date(),
    private _updatedAt: Date,
    private _attachment?: string,
  ) {
    super(id);
  }

  static create(
    valueInCents: Money,
    reason: string,
    type: AdjustmentType,
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
      valueInCents,
      reason,
      type,
      new Date(),
      new Date(),
      attachment,
    );
  }

  static fromJSON(json: any): Adjustment {
    return new Adjustment(
      new Uuid(json.id),
      Money.create(json.valueInCents),
      json.reason,
      json.type as AdjustmentType,
      new Date(json.createdAt),
      new Date(json.updatedAt),
      json.attachment || undefined,
    );
  }

  get valueInCents(): Money {
    return this._valueInCents;
  }

  get reason(): string {
    return this._reason;
  }

  get type(): AdjustmentType {
    return this._type;
  }

  get attachment(): string | undefined {
    return this._attachment;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
