import { AggregateRoot } from "@domain/@shared/interfaces/aggregate-root.abstract";
import { Cents } from "@domain/@shared/value-objects/cents.value";
import { StorePixTransactionID } from "./store-pix-transaction-id.value";
import { PixStatus } from "./pix-status.value";

export class StorePixTransaction extends AggregateRoot<StorePixTransactionID> {
  constructor(
    id: StorePixTransactionID,
    private readonly _storeId: number,
    private readonly _transactionId: string,
    private readonly _referenceId: string,
    private _status: PixStatus,
    private readonly _expirationDate: string,
    private readonly _pixKey: string,
    private readonly _pixQrCode: string,
    private readonly _amountInCents: Cents,
    private readonly _description: string | null,
  ) {
    super(id);
  }

  static create(
    id: StorePixTransactionID,
    storeId: number,
    transactionId: string,
    referenceId: string,
    status: PixStatus,
    expirationDate: string,
    pixKey: string,
    pixQrCode: string,
    amountInCents: number,
    description: string | null,
  ): StorePixTransaction {
    const now = new Date();

    return new StorePixTransaction(
      id,
      storeId,
      transactionId,
      referenceId,
      status,
      expirationDate,
      pixKey,
      pixQrCode,
      Cents.create(amountInCents),
      description,
    );
  }

  static fromJSON(json: StorePixTransactionJSON): StorePixTransaction {
    return new StorePixTransaction(
      new StorePixTransactionID(json.id),
      json.storeId,
      json.transactionId,
      json.referenceId,
      PixStatus.from(json.status),
      json.expirationDate,
      json.pixKey,
      json.pixQrCode,
      Cents.create(Number(json.amountInCents)),
      json.description ?? null,
    );
  }

  toJSON(): StorePixTransactionJSON {
    return {
      id: this.id.getValue(),
      storeId: this._storeId,
      transactionId: this._transactionId,
      referenceId: this._referenceId,
      status: this._status.getValue(),
      expirationDate: this._expirationDate,
      pixKey: this._pixKey,
      pixQrCode: this._pixQrCode,
      amountInCents: String(this._amountInCents.getValue()),
      description: this._description ?? null,
    };
  }

  markAsPaid(): void {
    if (this._status.isPaid()) {
      throw new Error("StorePixTransaction is already paid");
    }

    this._status = PixStatus.paid();
  }

  isPaid(): boolean {
    return this._status.isPaid();
  }

  get status(): PixStatus {
    return this._status;
  }

  get storeId(): number {
    return this._storeId;
  }

  get amount(): Cents {
    return this._amountInCents;
  }

  get transactionId(): string {
    return this._transactionId;
  }

  get referenceId(): string {
    return this._referenceId;
  }
}

export interface StorePixTransactionJSON {
  id: number;
  storeId: number;
  transactionId: string;
  referenceId: string;
  status: string;
  expirationDate: string;
  pixKey: string;
  pixQrCode: string;
  amountInCents: string;
  description?: string | null;
}
