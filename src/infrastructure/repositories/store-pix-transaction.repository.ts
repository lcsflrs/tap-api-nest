import { Injectable } from "@nestjs/common";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import type { IStorePixTransactionRepository } from "./interfaces/store-pix-transaction-repository.interface";
import { StorePixTransaction } from "@domain/payment/store-pix-transaction.aggregate";
import { StorePixTransactionMapper } from "@infrastructure/mappers/store-pix-transaction.mapper";

@Injectable()
export class StorePixTransactionRepository implements IStorePixTransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(pix: StorePixTransaction): Promise<void> {
    const data = StorePixTransactionMapper.toPersistence(pix);

    await this.prisma.storePixTransaction.upsert({
      where: { referenceId: data.referenceId },
      create: data,
      update: {
        status: data.status,
      },
    });
  }

  async findByReferenceId(
    referenceId: string,
  ): Promise<StorePixTransaction | null> {
    const storePixtransaction =
      await this.prisma.storePixTransaction.findUnique({
        where: { referenceId },
      });

    if (!storePixtransaction) {
      return null;
    }

    return StorePixTransactionMapper.toDomain(storePixtransaction);
  }

  async findByTransactionId(
    transactionId: string,
  ): Promise<StorePixTransaction | null> {
    const storePixTransaction =
      await this.prisma.storePixTransaction.findUnique({
        where: { transactionId },
      });

    if (!storePixTransaction) {
      return null;
    }

    return StorePixTransactionMapper.toDomain(storePixTransaction);
  }
}
