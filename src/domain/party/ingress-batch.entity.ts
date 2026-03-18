import { Entity } from "@domain/@shared/interfaces/entity.abstract";
import { IngressBatchID } from "./ingress-batch-id.value";
import { PartyID } from "../party/party-id.value";

export class IngressBatch extends Entity<IngressBatchID> {
  constructor(
    id: IngressBatchID,
    private readonly _partyId: PartyID,
    private readonly _name: string,
    private _description: string | null,
    private _quantity: number,
    private _quantitySold: number,
    private readonly _priceInCents: number,
    private _isActive: boolean,
  ) {
    super(id);
  }

  static create(
    id: IngressBatchID,
    partyId: PartyID,
    name: string,
    quantity: number,
    quantitySold: number,
    priceInCents: number,
    isActive: boolean,
    description: string | null = null,
  ): IngressBatch {
    if (!name.trim()) {
      throw new Error("IngressBatch name is required");
    }

    if (quantity <= 0) {
      throw new Error("IngressBatch quantity must be greater than zero");
    }

    if (priceInCents <= 0) {
      throw new Error("IngressBatch price must be greater than zero");
    }

    if (quantitySold > quantity) {
      throw new Error("Quantity sold cannot exceed total quantity");
    }

    return new IngressBatch(
      id,
      partyId,
      name.trim(),
      description,
      quantity,
      quantitySold,
      priceInCents,
      isActive,
    );
  }

  static fromJSON(json: IngressBatchJSON): IngressBatch {
    return new IngressBatch(
      new IngressBatchID(json.id),
      new PartyID(json.partyId),
      json.name,
      json.description ?? null,
      json.quantity,
      json.quantitySold,
      json.priceInCents,
      json.isActive,
    );
  }

  toJSON(): IngressBatchJSON {
    return {
      id: this.getId().getValue(),
      partyId: this._partyId.getValue(),
      name: this._name,
      description: this._description ?? null,
      quantity: this._quantity,
      quantitySold: this._quantitySold,
      priceInCents: this._priceInCents,
      isActive: this._isActive,
    };
  }

  sellOne(): void {
    if (this._quantitySold >= this._quantity) {
      throw new Error("IngressBatch is sold out");
    }

    if (!this._isActive) {
      throw new Error("IngressBatch is not active");
    }

    this._quantitySold += 1;
  }

  hasStock(): boolean {
    return this._quantitySold < this._quantity;
  }

  isAvailableForSale(): boolean {
    return this._isActive && this.hasStock();
  }

  activate(): void {
    this._isActive = true;
  }

  deactivate(): void {
    this._isActive = false;
  }

  get priceInCents(): number {
    return this._priceInCents;
  }

  get name(): string {
    return this._name;
  }
}

export interface IngressBatchJSON {
  id: number;
  partyId: number;
  name: string;
  description?: string | null;
  quantity: number;
  quantitySold: number;
  priceInCents: number;
  isActive: boolean;
}
