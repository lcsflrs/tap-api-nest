import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetAllBankAccountsQuery } from "./dtos/get-all-bank-accounts.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(GetAllBankAccountsQuery)
export class GetAllBankAccountsHandler implements IQueryHandler<GetAllBankAccountsQuery> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: GetAllBankAccountsQuery) {
    const bankAccounts = await this.prisma.storeBankAccount.findMany({
      where: { storeId: query.storeId },
    });

    return {
      bankAccounts: bankAccounts.map((account) => ({
        accountNumber: account.accountNumber,
        routingNumber: account.routingNumber,
        holderName: account.holderName,
        type: account.type,
        bankCode: account.bankCode,
        document: account.document,
      })),
    };
  }
}
