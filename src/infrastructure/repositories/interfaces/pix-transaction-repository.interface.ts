import { PixTransaction } from "@domain/payment/pix-transaction.aggregate";

export interface IPixTransactionRepository {
  save(pix: PixTransaction): Promise<void>;
  findByReferenceId(referenceId: string): Promise<PixTransaction | null>;
  findByTransactionId(transactionId: string): Promise<PixTransaction | null>;
  updatePixTransactionStatus(
    transactionId: string,
    status: string,
  ): Promise<void>;
}
