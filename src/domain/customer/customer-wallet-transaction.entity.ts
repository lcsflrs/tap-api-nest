import { Entity } from "@domain/@shared/interfaces/entity.abstract";
import { Cents } from "@domain/@shared/value-objects/cents.value";
import { CustomerWalletTransactionID } from "./customer-wallet-transaction-id.value";
import { WalletTransactionType } from "./wallet-transaction-type.value";

export class CustomerWalletTransaction extends Entity<CustomerWalletTransactionID> {
  constructor(
    id: CustomerWalletTransactionID,
    private readonly customerId: number,
    private readonly transactionId: string,
    private readonly referenceId: string,
    private readonly amount: Cents,
    private readonly type: WalletTransactionType,
    private readonly description: string | null,
    private readonly balanceAfter: Cents,
  ) {
    super(id);
  }

  static create(
    id: CustomerWalletTransactionID,
    customerId: number,
    transactionId: string,
    referenceId: string,
    amountInCents: number,
    type: WalletTransactionType,
    description: string | null,
    balanceAfterInCents: number,
  ): CustomerWalletTransaction {
    if (!transactionId.trim()) {
      throw new Error("TransactionId is required");
    }

    if (!referenceId.trim()) {
      throw new Error("ReferenceId is required");
    }

    const now = new Date();

    return new CustomerWalletTransaction(
      id,
      customerId,
      transactionId,
      referenceId,
      Cents.create(amountInCents),
      type,
      description,
      Cents.create(balanceAfterInCents),
    );
  }

  static fromJSON(
    json: CustomerWalletTransactionJSON,
  ): CustomerWalletTransaction {
    return new CustomerWalletTransaction(
      new CustomerWalletTransactionID(json.id),
      json.customerId,
      json.transactionId,
      json.referenceId,
      Cents.create(json.amountInCents),
      WalletTransactionType.create(json.type),
      json.description ?? null,
      Cents.create(json.balanceAfter),
    );
  }

  toJSON(): CustomerWalletTransactionJSON {
    return {
      id: this.id.getValue(),
      customerId: this.customerId,
      transactionId: this.transactionId,
      referenceId: this.referenceId,
      amountInCents: this.amount.getValue(),
      type: this.type.getValue(),
      description: this.description ?? null,
      balanceAfter: this.balanceAfter.getValue(),
    };
  }

  getType(): WalletTransactionType {
    return this.type;
  }

  getAmount(): Cents {
    return this.amount;
  }

  getCustomerId(): number {
    return this.customerId;
  }

  getTransactionId(): string {
    return this.transactionId;
  }
}

export interface CustomerWalletTransactionJSON {
  id: number;
  customerId: number;
  transactionId: string;
  referenceId: string;
  amountInCents: number;
  type: "in" | "out";
  description?: string | null;
  balanceAfter: number;
}
