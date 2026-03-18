import { Entity } from "@domain/@shared/interfaces/entity.abstract";
import { StoreBankAccountID } from "./store-bank-account-id.value";
import {
  BankAccountType,
  BANK_ACCOUNT_TYPES,
} from "./store-bank-account-type.value";

export class StoreBankAccount extends Entity<StoreBankAccountID> {
  constructor(
    id: StoreBankAccountID,
    private readonly _storeId: number,
    private readonly _accountNumber: string,
    private readonly _routingNumber: string,
    private readonly _bankCode: string,
    private readonly _holderName: string,
    private readonly _document: string,
    private readonly _type: BankAccountType,
    private readonly _ioToken: string,
  ) {
    super(id);
  }

  static create(
    id: StoreBankAccountID,
    storeId: number,
    accountNumber: string,
    routingNumber: string,
    bankCode: string,
    holderName: string,
    document: string,
    type: BankAccountType,
    ioToken: string,
  ): StoreBankAccount {
    if (!accountNumber.trim()) {
      throw new Error("[STORE_BANK_ACCOUNT] Account number is required");
    }

    if (!routingNumber.trim()) {
      throw new Error("[STORE_BANK_ACCOUNT] Routing number is required");
    }

    if (!bankCode.trim()) {
      throw new Error("[STORE_BANK_ACCOUNT] Bank code is required");
    }

    if (!ioToken.trim()) {
      throw new Error("[STORE_BANK_ACCOUNT] IO token is required");
    }

    if (!BANK_ACCOUNT_TYPES.includes(type)) {
      throw new Error("[STORE_BANK_ACCOUNT] Invalid bank account type");
    }

    return new StoreBankAccount(
      id,
      storeId,
      accountNumber,
      routingNumber,
      bankCode,
      holderName,
      document,
      type,
      ioToken,
    );
  }

  static fromJSON(json: StoreBankAccountJSON): StoreBankAccount {
    return new StoreBankAccount(
      new StoreBankAccountID(json.id),
      json.storeId,
      json.accountNumber,
      json.routingNumber,
      json.bankCode,
      json.holderName,
      json.document,
      json.type as BankAccountType,
      json.ioToken,
    );
  }

  toJSON(): StoreBankAccountJSON {
    return {
      id: this.id.getValue(),
      storeId: this._storeId,
      accountNumber: this._accountNumber,
      routingNumber: this._routingNumber,
      bankCode: this._bankCode,
      holderName: this._holderName,
      document: this._document,
      type: this._type,
      ioToken: this._ioToken,
    };
  }

  getDocumentType(): "cpf" | "cnpj" {
    return this._document.replace(/\D/g, "").length === 11 ? "cpf" : "cnpj";
  }
  get storeId(): number {
    return this._storeId;
  }

  get accountNumber(): string {
    return this._accountNumber;
  }

  get routingNumber(): string {
    return this._routingNumber;
  }

  get bankCode(): string {
    return this._bankCode;
  }

  get holderName(): string {
    return this._holderName;
  }

  get document(): string {
    return this._document;
  }

  get type(): BankAccountType {
    return this._type;
  }

  get ioToken(): string {
    return this._ioToken;
  }
}

export interface StoreBankAccountJSON {
  id: number;
  storeId: number;
  accountNumber: string;
  routingNumber: string;
  bankCode: string;
  holderName: string;
  document: string;
  type: string;
  ioToken: string;
}
