import { AggregateRoot } from "@domain/@shared/interfaces/aggregate-root.abstract";
import { IngressID } from "./ingress-id.value";
import { PartyID } from "@domain/party/party-id.value";
import { CustomerID } from "@domain/customer/customer-id.value";
import { IngressStatusID } from "@domain/party/ingress-status-id.value";
import { IngressBatchID } from "@domain/party/ingress-batch-id.value";
import { PaymentMethod } from "@domain/@shared/value-objects/payment-method.value";

export class Ingress extends AggregateRoot<IngressID> {
  constructor(
    id: IngressID,
    private readonly _partyId: PartyID,
    private _ingressStatusId: IngressStatusID,
    private _ingressBatchId: IngressBatchID | null,
    private readonly _paymentMethod: PaymentMethod,
    private readonly _customerId: CustomerID,
    private _valueInCents: number | null,
    private _braceletNumber: number | null,
    private _transactionId: string | null,
  ) {
    super(id);
  }

  static create(
    id: IngressID,
    partyId: PartyID,
    ingressStatusId: IngressStatusID,
    paymentMethodId: number,
    customerId: CustomerID,
    valueInCents: number | null = null,
    braceletNumber: number | null = null,
    transactionId: string | null = null,
    ingressBatchId: IngressBatchID | null = null,
  ): Ingress {
    return new Ingress(
      id,
      partyId,
      ingressStatusId,
      ingressBatchId,
      PaymentMethod.fromId(paymentMethodId),
      customerId,
      valueInCents,
      braceletNumber,
      transactionId,
    );
  }

  static fromJSON(json: IngressJSON): Ingress {
    return new Ingress(
      new IngressID(json.id),
      new PartyID(json.partyId),
      new IngressStatusID(json.ingressStatusId),
      json.ingressBatchId ? new IngressBatchID(json.ingressBatchId) : null,
      PaymentMethod.fromId(json.paymentMethodId),
      new CustomerID(json.customerId),
      json.valueInCents ?? null,
      json.braceletNumber ?? null,
      json.transactionId ?? null,
    );
  }

  toJSON(): IngressJSON {
    return {
      id: this.getId().getValue(),
      transactionId: this._transactionId ?? null,
      partyId: this._partyId.getValue(),
      ingressStatusId: this._ingressStatusId.getValue(),
      ingressBatchId: this._ingressBatchId?.getValue() ?? null,
      paymentMethodId: this._paymentMethod.toId(),
      customerId: this._customerId.getValue(),
      valueInCents: this._valueInCents ?? null,
      braceletNumber: this._braceletNumber ?? null,
    };
  }

  updateStatus(statusId: IngressStatusID): void {
    this._ingressStatusId = statusId;
  }

  setTransactionId(transactionId: string): void {
    this._transactionId = transactionId;
  }

  setBraceletNumber(braceletNumber: number): void {
    if (this._braceletNumber !== null) {
      throw new Error("Ingress already has a bracelet number");
    }

    this._braceletNumber = braceletNumber;
  }

  get partyId(): PartyID {
    return this._partyId;
  }

  get customerId(): CustomerID {
    return this._customerId;
  }

  get valueInCents(): number | null {
    return this._valueInCents;
  }

  get paymentMethod(): PaymentMethod {
    return this._paymentMethod;
  }

  get ingressStatusId(): IngressStatusID {
    return this._ingressStatusId;
  }

  get ingressBatchId(): IngressBatchID | null {
    return this._ingressBatchId;
  }

  get transactionId(): string | null {
    return this._transactionId;
  }

  get braceletNumber(): number | null {
    return this._braceletNumber;
  }
}

export interface IngressJSON {
  id: number;
  transactionId?: string | null;
  partyId: number;
  ingressStatusId: number;
  ingressBatchId?: number | null;
  paymentMethodId: number;
  customerId: number;
  valueInCents?: number | null;
  braceletNumber?: number | null;
}
