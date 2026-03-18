import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetBankAccountQuery } from "./dtos/get-bank-account.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(GetBankAccountQuery)
export class GetBankAccountHandler implements IQueryHandler<GetBankAccountQuery> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: GetBankAccountQuery) {
    const bankAccount = await this.prisma.storeBankAccount.findFirst({
      where: { storeId: query.storeId },
    });

    if (!bankAccount) {
      throw new Error("Bank account not found");
    }

    return {
      accountNumber: bankAccount.accountNumber,
      routingNumber: bankAccount.routingNumber,
      holderName: bankAccount.holderName,
      type: bankAccount.type,
      bankCode: bankAccount.bankCode,
      document: bankAccount.document,
    };
  }
}
