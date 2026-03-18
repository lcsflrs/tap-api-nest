import { AggregateRoot } from "@domain/@shared/interfaces/aggregate-root.abstract";
import { PartyID } from "./party-id.value";
import { AccessUserID } from "@domain/access-user/access-user-id.value";
import { IngressBatch, IngressBatchJSON } from "./ingress-batch.entity";
import { IngressBatchID } from "./ingress-batch-id.value";
import { Invite, InviteJSON } from "./invite.entity";
import { Promoter, PromoterJSON } from "./promoter.entity";
import { CustomerID } from "@domain/customer/customer-id.value";

export class Party extends AggregateRoot<PartyID> {
  constructor(
    id: PartyID,
    private readonly _name: string,
    private readonly _date: string,
    private readonly _time: string,
    private _description: string,
    private _address: string | null,
    private readonly _accessUserId: AccessUserID,
    private readonly _ingressBatches: IngressBatch[],
    private readonly _invites: Invite[],
    private readonly _promoters: Promoter[],
  ) {
    super(id);
  }

  static create(
    id: PartyID,
    name: string,
    date: string,
    time: string,
    description: string = "",
    address: string | null,
    accessUserId: AccessUserID,
  ): Party {
    if (!name.trim()) {
      throw new Error("Party name is required");
    }

    if (!date.trim()) {
      throw new Error("Party date is required");
    }

    if (!time.trim()) {
      throw new Error("Party time is required");
    }

    return new Party(
      id,
      name.trim(),
      date.trim(),
      time.trim(),
      description,
      address ?? null,
      accessUserId,
      [],
      [],
      [],
    );
  }

  static fromJSON(json: PartyJSON): Party {
    return new Party(
      new PartyID(json.id),
      json.name,
      json.date,
      json.time,
      json.description ?? "",
      json.address ?? null,
      new AccessUserID(json.accessUserId),
      json.ingressBatches.map(IngressBatch.fromJSON),
      json.invites.map(Invite.fromJSON),
      json.promoters.map(Promoter.fromJSON),
    );
  }

  toJSON(): PartyJSON {
    return {
      id: this.getId().getValue(),
      name: this._name,
      date: this._date,
      time: this._time,
      description: this._description,
      address: this._address ?? null,
      accessUserId: this._accessUserId.getValue(),
      ingressBatches: this._ingressBatches.map((b) => b.toJSON()),
      invites: this._invites.map((i) => i.toJSON()),
      promoters: this._promoters.map((p) => p.toJSON()),
    };
  }

  addIngressBatch(batch: IngressBatch): void {
    this._ingressBatches.push(batch);
  }

  addInvite(invite: Invite): void {
    this._invites.push(invite);
  }

  addPromoter(promoter: Promoter): void {
    if (
      this._promoters.some(
        (p) => p.customerId.getValue() === promoter.customerId.getValue(),
      )
    ) {
      throw new Error("Customer is already a promoter of this party");
    }

    this._promoters.push(promoter);
  }

  hasCustomerIngress(customerId: CustomerID): boolean {
    return this._invites.some(
      (i) =>
        i.invitedByCustomerId.getValue() === customerId.getValue() &&
        i.hasIngress(),
    );
  }

  setActiveBatch(batchId: IngressBatchID | null): void {
    for (const batch of this.ingressBatches) {
      if (batchId && batch.getId().getValue() === batchId.getValue()) {
        batch.activate();
      } else {
        batch.deactivate();
      }
    }
  }

  get name(): string {
    return this._name;
  }

  get ingressBatches(): IngressBatch[] {
    return [...this._ingressBatches];
  }

  get availableBatches(): IngressBatch[] {
    return this._ingressBatches.filter((b) => b.isAvailableForSale());
  }

  get invites(): Invite[] {
    return [...this._invites];
  }

  get promoters(): Promoter[] {
    return [...this._promoters];
  }
}

export interface PartyJSON {
  id: number;
  name: string;
  date: string;
  time: string;
  description: string;
  address?: string | null;
  accessUserId: number;
  ingressBatches: IngressBatchJSON[];
  invites: InviteJSON[];
  promoters: PromoterJSON[];
}
