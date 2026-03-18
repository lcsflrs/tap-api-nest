import { Entity } from "@domain/@shared/interfaces/entity.abstract";
import { InviteID } from "./invite-id.value";
import { CustomerID } from "@domain/customer/customer-id.value";
import { IngressID } from "@domain/ingress/ingress-id.value";
import { PartyID } from "./party-id.value";

export class Invite extends Entity<InviteID> {
  constructor(
    id: InviteID,
    private readonly _partyId: PartyID,
    private _name: string | null,
    private _phone: string | null,
    private _document: string | null,
    private _email: string | null,
    private readonly _invitedByCustomerId: CustomerID,
    private _ingressId: IngressID | null,
  ) {
    super(id);
  }

  static create(
    id: InviteID,
    partyId: PartyID,
    invitedByCustomerId: CustomerID,
    name: string | null,
    phone: string | null,
    document: string | null,
    email: string | null,
  ): Invite {
    return new Invite(
      id,
      partyId,
      name,
      phone,
      document,
      email,
      invitedByCustomerId,
      null,
    );
  }

  static fromJSON(json: InviteJSON): Invite {
    return new Invite(
      new InviteID(json.id),
      new PartyID(json.partyId),
      json.name ?? null,
      json.phone ?? null,
      json.document ?? null,
      json.email ?? null,
      new CustomerID(json.invitedByCustomerId),
      json.ingressId ? new IngressID(json.ingressId) : null,
    );
  }

  toJSON(): InviteJSON {
    return {
      id: this.getId().getValue(),
      partyId: this._partyId.getValue(),
      name: this._name ?? null,
      phone: this._phone ?? null,
      document: this._document ?? null,
      email: this._email ?? null,
      invitedByCustomerId: this._invitedByCustomerId.getValue(),
      ingressId: this._ingressId?.getValue() ?? null,
    };
  }

  linkToIngress(ingressId: IngressID): void {
    if (this._ingressId) {
      throw new Error("Invite already linked to ingress");
    }

    this._ingressId = ingressId;
  }

  hasIngress(): boolean {
    return this._ingressId !== null;
  }

  get invitedByCustomerId(): CustomerID {
    return this._invitedByCustomerId;
  }
}

export interface InviteJSON {
  id: number;
  partyId: number;
  name?: string | null;
  phone?: string | null;
  document?: string | null;
  email?: string | null;
  invitedByCustomerId: number;
  ingressId?: number | null;
}
