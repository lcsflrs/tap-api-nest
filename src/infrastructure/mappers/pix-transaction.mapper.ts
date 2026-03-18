import { PixTransaction } from "@domain/payment/pix-transaction.aggregate";

export class PixTransactionMapper {
  static toPersistence(pix: PixTransaction) {
    const json = pix.toJSON();

    return {
      customerId: json.customerId ?? null,
      storeId: json.storeId ?? null,
      transactionId: json.transactionId,
      referenceId: json.referenceId,
      status: json.status,
      expirationDate: json.expirationDate,
      pixKey: json.pixKey,
      pixQrCode: json.pixQrCode,
      amountInCents: json.amountInCents,
      description: json.description ?? null,
      pixEmv: json.pixEmv ?? null,
      pixType: json.pixType ?? null,
    };
  }

  static toDomain(pixTransaction: any): PixTransaction {
    return PixTransaction.fromJSON({
      id: pixTransaction.id,
      customerId: pixTransaction.customerId ?? null,
      storeId: pixTransaction.storeId ?? null,
      transactionId: pixTransaction.transactionId,
      referenceId: pixTransaction.referenceId,
      status: pixTransaction.status,
      expirationDate: pixTransaction.expirationDate,
      pixKey: pixTransaction.pixKey,
      pixQrCode: pixTransaction.pixQrCode,
      amountInCents: pixTransaction.amountInCents,
      description: pixTransaction.description ?? null,
      pixEmv: pixTransaction.pixEmv ?? null,
      pixType: pixTransaction.pixType ?? null,
    });
  }
}
