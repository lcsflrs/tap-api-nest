import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { randomUUID } from "crypto";
import { CreateStorePixTransactionCommand } from "./dtos/create-store-pix-transaction.command";
import type { IPixTransactionRepository } from "@infrastructure/repositories/interfaces/pix-transaction-repository.interface";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import type { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";
import { PixTransaction } from "@domain/payment/pix-transaction.aggregate";
import { PixTransactionID } from "@domain/payment/pix-transaction-id.value";
import { PixStatus } from "@domain/payment/pix-status.value";
import { PixType } from "@domain/payment/pix-type.value";

const STORE_PIX_DESCRIPTION = "Venda com pix - Externo";
const STORE_PIX_STATEMENT_DESCRIPTOR = "Tap";

@CommandHandler(CreateStorePixTransactionCommand)
export class CreateStorePixTransactionHandler implements ICommandHandler<CreateStorePixTransactionCommand> {
  constructor(
    @Inject("PixTransactionRepository")
    private readonly pixTransactionRepository: IPixTransactionRepository,
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
  ) {}

  async execute(command: CreateStorePixTransactionCommand) {
    const { storeId, amountInCents } = command;

    const referenceId = randomUUID();

    const pix = await this.paymentGateway.generateStorePixTransaction({
      storeId,
      amountInCents,
      referenceId,
      description: STORE_PIX_DESCRIPTION,
      statementDescriptor: STORE_PIX_STATEMENT_DESCRIPTOR,
    });

    const pixTransaction = PixTransaction.create(
      new PixTransactionID(0),
      pix.customerId ?? null,
      storeId,
      pix.transactionId,
      referenceId,
      PixStatus.from(pix.status),
      pix.expirationDate,
      pix.pixKey,
      pix.pixQrCode,
      pix.amountInCents,
      pix.description,
      pix.pixEmv,
      PixType.storeSale(),
    );

    await this.pixTransactionRepository.save(pixTransaction);

    return {
      storeId,
      customerId: pix.customerId ?? null,
      transactionId: pixTransaction.transactionId,
      referenceId: pixTransaction.referenceId,
      status: pixTransaction.status.getValue(),
      expirationDate: pixTransaction.expirationDate,
      pixKey: pixTransaction.pixKey ?? "",
      pixQrCode: pixTransaction.pixQrCode ?? "",
      pixEmv: pixTransaction.pixEmv ?? "",
      amountInCents: pixTransaction.amount.getValue(),
      description: pixTransaction.description ?? "",
      pixType: pixTransaction.pixType?.getValue() ?? "",
    };
  }
}
