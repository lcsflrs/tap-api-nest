import { Entity } from "@domain/@shared/interfaces/entity.abstract";
import { PromoterID } from "./promoter-id.value";
import { CustomerID } from "@domain/customer/customer-id.value";
import { Cents } from "@domain/@shared/value-objects/cents.value";
import { PartyID } from "./party-id.value";

export class Promoter extends Entity<PromoterID> {
  constructor(
    id: PromoterID,
    private readonly _partyId: PartyID,
    private readonly _customerId: CustomerID,
    private _isActive: boolean,
    private _bonusInCents: Cents,
  ) {
    super(id);
  }

  static create(
    id: PromoterID,
    partyId: PartyID,
    customerId: CustomerID,
    bonusInCents: number,
  ): Promoter {
    if (bonusInCents < 0) {
      throw new Error("Promoter bonus cannot be negative");
    }

    const now = new Date();

    return new Promoter(
      id,
      partyId,
      customerId,
      true,
      Cents.create(bonusInCents),
    );
  }

  static fromJSON(json: PromoterJSON): Promoter {
    return new Promoter(
      new PromoterID(json.id),
      new PartyID(json.partyId),
      new CustomerID(json.customerId),
      json.isActive ?? true,
      Cents.create(json.bonusInCents ?? 0),
    );
  }

  toJSON(): PromoterJSON {
    return {
      id: this.getId().getValue(),
      partyId: this._partyId.getValue(),
      customerId: this._customerId.getValue(),
      isActive: this._isActive,
      bonusInCents: this._bonusInCents.getValue(),
    };
  }

  deactivate(): void {
    this._isActive = false;
  }

  get bonus(): Cents {
    return this._bonusInCents;
  }

  get customerId(): CustomerID {
    return this._customerId;
  }
}

export interface PromoterJSON {
  id: number;
  partyId: number;
  customerId: number;
  isActive: boolean;
  bonusInCents: number;
}
