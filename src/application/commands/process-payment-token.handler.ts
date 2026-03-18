import { CommandHandler, ICommandHandler, CommandBus } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import {
  ProcessPaymentTokenCommand,
  ProcessPaymentTokenResult,
} from "./dtos/process-payment-token.command";
import type { ICustomerRepository } from "@infrastructure/repositories/interfaces/customer-repository.interface";
import type { IPaymentTokenRepository } from "@infrastructure/repositories/interfaces/payment-token-repository.interface";
import type { ISocketService } from "@infrastructure/adapters/socket/socket.interface";
import type { IJwtService } from "@infrastructure/adapters/jwt/jwt.interface";
import {
  ExecuteCreditTransactionCommand,
  ExecuteCreditTransactionResult,
} from "@infrastructure/third-party/iopay/commands/dtos/execute-credit-transaction.command";

@CommandHandler(ProcessPaymentTokenCommand)
export class ProcessPaymentTokenHandler implements ICommandHandler<
  ProcessPaymentTokenCommand,
  ProcessPaymentTokenResult
> {
  constructor(
    @Inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository,
    @Inject("PaymentTokenRepository")
    private readonly paymentTokenRepository: IPaymentTokenRepository,
    @Inject("SocketService")
    private readonly socketService: ISocketService,
    @Inject("JwtService")
    private readonly jwtService: IJwtService,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(
    command: ProcessPaymentTokenCommand,
  ): Promise<ProcessPaymentTokenResult> {
    const decoded = this.jwtService.decode(command.paymentTokenJwt) as {
      userId: number;
      partyId: number;
      paymentTokenId: string;
    } | null;

    if (!decoded?.userId || !decoded?.paymentTokenId) {
      throw new Error("Malformed payment token JWT");
    }

    const paymentToken = await this.paymentTokenRepository.findById(
      decoded.paymentTokenId,
    );

    if (!paymentToken) {
      throw new Error("Payment token not found");
    }

    if (paymentToken.paymentStatus === "paid") {
      throw new Error("Payment token already paid");
    }

    await this.paymentTokenRepository.updateStatus(
      decoded.paymentTokenId,
      "processing",
    );

    this.socketService.emitToParty(
      `update_token_party_${paymentToken.partyId}`,
      paymentToken,
    );
    this.socketService.emitPaymentTokenUpdate(
      decoded.paymentTokenId,
      "processing",
    );

    const customer = await this.customerRepository.findById(decoded.userId);

    if (!customer) {
      throw new Error("Customer not found");
    }

    if (!customer.wallet?.defaultCreditCardId) {
      throw new Error("Customer has no default card");
    }

    if (!customer.ioCustomerId) {
      throw new Error("Customer has no ioCustomerId");
    }

    try {
      const { transactionId } = await this.commandBus.execute<
        ExecuteCreditTransactionCommand,
        ExecuteCreditTransactionResult
      >(
        new ExecuteCreditTransactionCommand(
          paymentToken.user.customerId,
          customer.wallet.defaultCreditCardId,
          paymentToken.amount,
          paymentToken.installments,
          decoded.paymentTokenId,
          paymentToken.party.name,
          paymentToken.party.name,
          paymentToken.products.map((p) => ({
            id: p.code,
            name: p.name,
            priceInCents: p.amount,
            quantity: p.quantity,
          })),
        ),
      );

      await this.paymentTokenRepository.updateStatus(
        decoded.paymentTokenId,
        "paid",
        {
          payedAt: new Date(),
          transactionId,
        },
      );

      this.socketService.emitToParty(
        `update_token_party_${paymentToken.partyId}`,
        paymentToken,
      );
      this.socketService.emitPaymentTokenUpdate(decoded.paymentTokenId, "paid");

      return { transactionId };
    } catch (err: any) {
      await this.paymentTokenRepository.updateStatus(
        decoded.paymentTokenId,
        "error_payment",
      );

      this.socketService.emitPaymentTokenUpdate(
        decoded.paymentTokenId,
        "error_payment",
      );

      throw new Error(`[PAYMENT_TOKEN] ${err.message}`);
    }
  }
}
