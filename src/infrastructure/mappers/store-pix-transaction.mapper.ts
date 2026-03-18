import { StorePixTransaction } from "@domain/payment/store-pix-transaction.aggregate";

export class StorePixTransactionMapper {
  static toPersistence(pix: StorePixTransaction) {
    const json = pix.toJSON();

    return {
      storeId: json.storeId,
      transactionId: json.transactionId,
      referenceId: json.referenceId,
      status: json.status,
      expirationDate: json.expirationDate,
      pixKey: json.pixKey,
      pixQrCode: json.pixQrCode,
      amountInCents: json.amountInCents,
      description: json.description ?? null,
    };
  }

  static toDomain(storePixTransaction: any): StorePixTransaction {
    return StorePixTransaction.fromJSON({
      id: storePixTransaction.id,
      storeId: storePixTransaction.storeId,
      transactionId: storePixTransaction.transactionId,
      referenceId: storePixTransaction.referenceId,
      status: storePixTransaction.status,
      expirationDate: storePixTransaction.expirationDate,
      pixKey: storePixTransaction.pixKey,
      pixQrCode: storePixTransaction.pixQrCode,
      amountInCents: storePixTransaction.amountInCents,
      description: storePixTransaction.description ?? null,
    });
  }
}
