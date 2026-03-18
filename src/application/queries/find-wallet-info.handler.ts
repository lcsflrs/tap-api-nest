import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { FindWalletInfoQuery } from "./dtos/find-wallet-info.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(FindWalletInfoQuery)
export class FindWalletInfoHandler implements IQueryHandler<FindWalletInfoQuery> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: FindWalletInfoQuery) {
    const wallet = await this.prisma.customerWallet.findUnique({
      where: { customerId: query.customerId },
    });

    if (!wallet) {
      throw new Error("Wallet not found");
    }

    return {
      balance: wallet.balance,
      defaultPaymentMethod: wallet.defaultPaymentMethod,
    };
  }
}
