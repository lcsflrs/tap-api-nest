import { StorePixTransaction } from "@domain/payment/store-pix-transaction.aggregate";

export interface IStorePixTransactionRepository {
  save(pix: StorePixTransaction): Promise<void>;
  findByReferenceId(referenceId: string): Promise<StorePixTransaction | null>;
  findByTransactionId(
    transactionId: string,
  ): Promise<StorePixTransaction | null>;
}
