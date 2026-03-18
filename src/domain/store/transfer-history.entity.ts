import { Entity } from "@domain/@shared/interfaces/entity.abstract";
import { Cents } from "@domain/@shared/value-objects/cents.value";
import { TransferHistoryID } from "./transfer-history-id.value";

export class TransferHistory extends Entity<TransferHistoryID> {
  constructor(
    id: TransferHistoryID,
    private readonly _bankAccountId: number,
    private readonly _storeId: number,
    private readonly _amountInCents: Cents,
    private readonly _description: string | null,
    private readonly _statementDescriptor: string | null,
  ) {
    super(id);
  }

  static create(
    id: TransferHistoryID,
    bankAccountId: number,
    storeId: number,
    amountInCents: number,
    description: string | null,
    statementDescriptor: string | null,
  ): TransferHistory {
    const now = new Date();

    return new TransferHistory(
      id,
      bankAccountId,
      storeId,
      Cents.create(amountInCents),
      description,
      statementDescriptor,
    );
  }

  static fromJSON(json: TransferHistoryJSON): TransferHistory {
    return new TransferHistory(
      new TransferHistoryID(json.id),
      json.bankAccountId,
      json.storeId,
      Cents.create(json.amountInCents),
      json.description ?? null,
      json.statementDescriptor ?? null,
    );
  }

  toJSON(): TransferHistoryJSON {
    return {
      id: this.id.getValue(),
      bankAccountId: this._bankAccountId,
      storeId: this._storeId,
      amountInCents: this._amountInCents.getValue(),
      description: this._description ?? null,
      statementDescriptor: this._statementDescriptor ?? null,
    };
  }

  get amount(): Cents {
    return this._amountInCents;
  }

  get storeId(): number {
    return this._storeId;
  }
}

export interface TransferHistoryJSON {
  id: number;
  bankAccountId: number;
  storeId: number;
  amountInCents: number;
  description?: string | null;
  statementDescriptor?: string | null;
}
