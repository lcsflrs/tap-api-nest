import { Injectable } from "@nestjs/common";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import type { IPixTransactionRepository } from "./interfaces/pix-transaction-repository.interface";
import { PixTransaction } from "@domain/payment/pix-transaction.aggregate";
import { PixTransactionMapper } from "@infrastructure/mappers/pix-transaction.mapper";

@Injectable()
export class PixTransactionRepository implements IPixTransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(pix: PixTransaction): Promise<void> {
    const data = PixTransactionMapper.toPersistence(pix);

    await this.prisma.pixTransaction.upsert({
      where: { referenceId: data.referenceId },
      create: data,
      update: {
        status: data.status,
        pixEmv: data.pixEmv,
      },
    });
  }

  async findByReferenceId(referenceId: string): Promise<PixTransaction | null> {
    const pixTransaction = await this.prisma.pixTransaction.findUnique({
      where: { referenceId },
    });

    if (!pixTransaction) {
      return null;
    }

    return PixTransactionMapper.toDomain(pixTransaction);
  }

  async findByTransactionId(
    transactionId: string,
  ): Promise<PixTransaction | null> {
    const pixTransaction = await this.prisma.pixTransaction.findUnique({
      where: { transactionId },
    });

    if (!pixTransaction) {
      return null;
    }

    return PixTransactionMapper.toDomain(pixTransaction);
  }

  async updatePixTransactionStatus(
    transactionId: string,
    status: string,
  ): Promise<void> {
    await this.prisma.pixTransaction.update({
      where: { transactionId },
      data: { status },
    });
  }
}
