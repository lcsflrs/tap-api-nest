import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetDefaultCreditCardQuery } from "./dtos/get-default-credit-card.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(GetDefaultCreditCardQuery)
export class GetDefaultCreditCardHandler implements IQueryHandler<GetDefaultCreditCardQuery> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: GetDefaultCreditCardQuery) {
    const { customerId } = query;

    const wallet = await this.prisma.customerWallet.findUnique({
      where: { customerId },
    });

    if (!wallet) {
      throw new Error("Wallet not found");
    }

    if (!wallet.defaultCreditCardId) {
      throw new Error("No default credit card set");
    }

    const creditCard = await this.prisma.creditCard.findFirst({
      where: { cardId: wallet.defaultCreditCardId },
    });

    if (!creditCard) {
      throw new Error("Default credit card not found");
    }

    return {
      customerId: creditCard.customerId,
      first4Digits: creditCard.first4Digits,
      last4Digits: creditCard.last4Digits,
      expirationMonth: creditCard.expirationMonth,
      expirationYear: creditCard.expirationYear,
      cardToken: creditCard.cardToken,
      cardId: creditCard.cardId,
      cardBrand: creditCard.cardBrand,
      holderName: creditCard.holderName,
    };
  }
}
