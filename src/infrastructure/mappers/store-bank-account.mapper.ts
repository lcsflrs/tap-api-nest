import { StoreBankAccount } from "@domain/store/store-bank-account.entity";

export class StoreBankAccountMapper {
  static toDomain(raw: any): StoreBankAccount {
    return StoreBankAccount.fromJSON({
      id: raw.id,
      storeId: raw.storeId,
      accountNumber: raw.accountNumber,
      routingNumber: raw.routingNumber,
      bankCode: raw.bankCode,
      holderName: raw.holderName,
      document: raw.document,
      type: raw.type,
      ioToken: raw.ioToken,
    });
  }

  static toPersistence(account: StoreBankAccount) {
    const json = account.toJSON();

    return {
      storeId: json.storeId,
      accountNumber: json.accountNumber,
      routingNumber: json.routingNumber,
      bankCode: json.bankCode,
      holderName: json.holderName,
      document: json.document,
      type: json.type,
      ioToken: json.ioToken,
    };
  }
}
