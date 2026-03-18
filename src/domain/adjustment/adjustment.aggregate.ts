import { AggregateRoot } from "../@shared/interfaces/aggregate-root.abstract";
import { Uuid } from "../@shared/interfaces/uuid";
import { Money } from "../@shared/value-objects/money.value";

export type AdjustmentType = "CREDIT" | "DEBIT";

export class Adjustment extends AggregateRoot<Uuid> {
  constructor(
    id: Uuid,
    private readonly _valueInCents: Money,
    private readonly _reason: string,
    private readonly _type: AdjustmentType,
    private readonly _attachment?: string,
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

    const now = new Date();

    return new Adjustment(
      Uuid.generate(),
      valueInCents,
      reason,
      type,
      attachment,
    );
  }

  static fromJSON(json: AdjustmentJSON): Adjustment {
    return new Adjustment(
      new Uuid(json.id),
      Money.create(json.valueInCents),
      json.reason,
      json.type,
      json.attachment ?? undefined,
    );
  }

  toJSON(): AdjustmentJSON {
    return {
      id: this.getId().getValue(),
      valueInCents: this._valueInCents.getValue(),
      reason: this._reason,
      type: this._type,
      attachment: this._attachment,
    };
  }

  getId(): Uuid {
    return this.id;
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
}

interface AdjustmentJSON {
  id: string;
  valueInCents: number;
  reason: string;
  type: AdjustmentType;
  attachment?: string;
}
