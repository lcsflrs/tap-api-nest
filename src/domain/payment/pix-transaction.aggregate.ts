import { AggregateRoot } from "@domain/@shared/interfaces/aggregate-root.abstract";
import { Cents } from "@domain/@shared/value-objects/cents.value";
import { PixTransactionID } from "./pix-transaction-id.value";
import { PixStatus } from "./pix-status.value";
import { PixType } from "./pix-type.value";

export class PixTransaction extends AggregateRoot<PixTransactionID> {
  constructor(
    id: PixTransactionID,
    private readonly _customerId: number | null,
    private readonly _storeId: number | null,
    private readonly _transactionId: string,
    private readonly _referenceId: string,
    private _status: PixStatus,
    private readonly _expirationDate: string,
    private readonly _pixKey: string,
    private readonly _pixQrCode: string,
    private readonly _amountInCents: Cents,
    private readonly _description: string | null,
    private readonly _pixEmv: string | null,
    private readonly _pixType: PixType | null,
  ) {
    super(id);
  }

  static create(
    id: PixTransactionID,
    customerId: number | null,
    storeId: number | null,
    transactionId: string,
    referenceId: string,
    status: PixStatus,
    expirationDate: string,
    pixKey: string,
    pixQrCode: string,
    amountInCents: number,
    description: string | null,
    pixEmv: string | null,
    pixType: PixType | null,
  ): PixTransaction {
    if (!transactionId.trim()) {
      throw new Error("TransactionId is required");
    }

    if (!referenceId.trim()) {
      throw new Error("ReferenceId is required");
    }

    return new PixTransaction(
      id,
      customerId,
      storeId,
      transactionId,
      referenceId,
      status,
      expirationDate,
      pixKey,
      pixQrCode,
      Cents.create(amountInCents),
      description,
      pixEmv,
      pixType,
    );
  }

  static fromJSON(json: PixTransactionJSON): PixTransaction {
    return new PixTransaction(
      new PixTransactionID(json.id),
      json.customerId ?? null,
      json.storeId ?? null,
      json.transactionId,
      json.referenceId,
      PixStatus.from(json.status),
      json.expirationDate,
      json.pixKey,
      json.pixQrCode,
      Cents.create(Number(json.amountInCents)),
      json.description ?? null,
      json.pixEmv ?? null,
      json.pixType ? PixType.from(json.pixType) : null,
    );
  }

  toJSON(): PixTransactionJSON {
    return {
      id: this.id.getValue(),
      customerId: this._customerId,
      storeId: this._storeId,
      transactionId: this._transactionId,
      referenceId: this._referenceId,
      status: this._status.getValue(),
      expirationDate: this._expirationDate,
      pixKey: this._pixKey,
      pixQrCode: this._pixQrCode,
      amountInCents: String(this._amountInCents.getValue()),
      description: this._description ?? null,
      pixEmv: this._pixEmv ?? null,
      pixType: this._pixType?.getValue() ?? null,
    };
  }

  markAsPaid(): void {
    if (this._status.isPaid()) {
      throw new Error("Pix transaction is already paid");
    }

    this._status = PixStatus.paid();
  }

  markAsExpired(): void {
    if (this._status.isPaid()) {
      throw new Error("Cannot expire a paid Pix transaction");
    }

    if (this._status.isExpired()) {
      throw new Error("Pix transaction is already expired");
    }

    this._status = PixStatus.expired();
  }

  isPaid(): boolean {
    return this._status.isPaid();
  }

  get status(): PixStatus {
    return this._status;
  }

  get pixType(): PixType | null {
    return this._pixType;
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

  get customerId(): number | null {
    return this._customerId;
  }

  get storeId(): number | null {
    return this._storeId;
  }

  get pixEmv(): string | null {
    return this._pixEmv;
  }

  get pixKey(): string {
    return this._pixKey;
  }

  get pixQrCode(): string {
    return this._pixQrCode;
  }

  get expirationDate(): string {
    return this._expirationDate;
  }

  get description(): string | null {
    return this._description;
  }
}

export interface PixTransactionJSON {
  id: number;
  customerId?: number | null;
  storeId?: number | null;
  transactionId: string;
  referenceId: string;
  status: string;
  expirationDate: string;
  pixKey: string;
  pixQrCode: string;
  amountInCents: string;
  description?: string | null;
  pixEmv?: string | null;
  pixType?: string | null;
}
