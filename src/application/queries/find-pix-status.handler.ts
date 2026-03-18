import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { FindPixStatusQuery } from "./dtos/find-pix-status.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import { AddBalanceCommand } from "@application/commands/dtos/add-balance.command";
import { AddIngressCommand } from "@application/commands/dtos/add-ingress.command";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";
import { isProdEnv } from "src/utils/is-prod-env";

@QueryHandler(FindPixStatusQuery)
export class FindPixStatusHandler implements IQueryHandler<FindPixStatusQuery> {
  constructor(
    @Inject() private readonly prisma: PrismaService,
    private readonly commandBus: CommandBus,
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
  ) {}

  async execute(query: FindPixStatusQuery): Promise<{ pixStatus: string }> {
    const transaction = await this.prisma.pixTransaction.findFirst({
      where: { transactionId: query.transactionId },
    });

    if (!transaction) {
      throw new Error("Pix transaction not found");
    }

    if (isProdEnv()) {
      const authResponse = await this.paymentGateway.getAuthToken();
      const authToken: string = authResponse.data.access_token;
      const result = await this.paymentGateway.getTransaction(
        query.transactionId,
        authToken,
      );
      return { pixStatus: result.status };
    }

    if (transaction.pixType === "AddBalance") {
      await this.commandBus.execute(
        new AddBalanceCommand(
          transaction.customerId ?? 0,
          Number(transaction.amountInCents),
          query.transactionId,
          transaction.referenceId,
        ),
      );
    } else {
      await this.commandBus.execute(
        new AddIngressCommand(
          query.customerId!,
          query.partyId!,
          query.transactionId,
        ),
      );
    }

    return { pixStatus: transaction.status };
  }
}
