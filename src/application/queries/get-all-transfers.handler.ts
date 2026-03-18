import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetAllTransfersQuery } from "./dtos/get-all-transfers.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(GetAllTransfersQuery)
export class GetAllTransfersHandler implements IQueryHandler<GetAllTransfersQuery> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: GetAllTransfersQuery) {
    const transfers = await this.prisma.transferHistory.findMany({
      where: { storeId: query.storeId },
      include: { storeBankAccount: true },
    });

    return {
      transfers: transfers.map((transfer) => ({
        id: transfer.id,
        amount: transfer.amountInCents,
        description: transfer.description ?? undefined,
        statementDescriptor: transfer.statementDescriptor ?? undefined,
        createdAt: transfer.createdAt,
        bankAccount: transfer.storeBankAccount
          ? {
              id: transfer.storeBankAccount.id,
              bankCode: transfer.storeBankAccount.bankCode,
              accountNumber: transfer.storeBankAccount.accountNumber,
            }
          : undefined,
      })),
    };
  }
}
