import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetAllCreditCardsQuery } from "./dtos/get-all-credit-cards.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(GetAllCreditCardsQuery)
export class GetAllCreditCardsHandler implements IQueryHandler<GetAllCreditCardsQuery> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: GetAllCreditCardsQuery) {
    const { customerId } = query;

    const wallet = await this.prisma.customerWallet.findUnique({
      where: { customerId },
    });

    if (!wallet) {
      throw new Error("Wallet not found");
    }

    const creditCards = await this.prisma.creditCard.findMany({
      where: { customerId, authenticated: true },
    });

    return {
      defaultCardId: wallet.defaultCreditCardId ?? "",
      creditCards: creditCards.map((card) => ({
        id: card.id,
        customerId: card.customerId,
        first4Digits: card.first4Digits,
        last4Digits: card.last4Digits,
        expirationMonth: card.expirationMonth,
        expirationYear: card.expirationYear,
        cardToken: card.cardToken,
        cardId: card.cardId,
        cardBrand: card.cardBrand,
        holderName: card.holderName,
      })),
    };
  }
}
