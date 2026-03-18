import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { randomUUID } from "crypto";
import { CreatePixTransactionCommand } from "./dtos/create-pix-transaction.command";
import type { IPixTransactionRepository } from "@infrastructure/repositories/interfaces/pix-transaction-repository.interface";
import type { ICustomerRepository } from "@infrastructure/repositories/interfaces/customer-repository.interface";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";
import { PixTransaction } from "@domain/payment/pix-transaction.aggregate";
import { PixTransactionID } from "@domain/payment/pix-transaction-id.value";
import { PixStatus } from "@domain/payment/pix-status.value";
import { PixType } from "@domain/payment/pix-type.value";

const PIX_STATEMENT_DESCRIPTOR = "Tap";

@CommandHandler(CreatePixTransactionCommand)
export class CreatePixTransactionHandler implements ICommandHandler<CreatePixTransactionCommand> {
  constructor(
    @Inject("PixTransactionRepository")
    private readonly pixTransactionRepository: IPixTransactionRepository,
    @Inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository,
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
  ) {}

  async execute(command: CreatePixTransactionCommand) {
    const { customerId, amountInCents } = command;

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new Error("Customer not found");
    }

    if (!customer.ioCustomerId) {
      throw new Error("Customer has no ioCustomerId");
    }

    const referenceId = randomUUID();

    const authResponse = await this.paymentGateway.getAuthToken();
    const authToken: string = authResponse.data.access_token;

    const pix = await this.paymentGateway.generatePixTransaction(
      customer.ioCustomerId,
      {
        amount: amountInCents,
        reference_id: referenceId,
        description: "Adição de saldo com pix",
        statement_descriptor: PIX_STATEMENT_DESCRIPTOR,
        currency: "BRL",
        io_seller_id: this.paymentGateway.getPaymentIoSellerId(),
        payment_type: "pix",
      },
      authToken,
    );

    const pixTransaction = PixTransaction.create(
      new PixTransactionID(0),
      customerId,
      null,
      pix.transactionId,
      referenceId,
      PixStatus.from(pix.status),
      pix.expirationDate,
      pix.pixKey,
      pix.pixQrCode,
      pix.amountInCents,
      pix.description,
      pix.pixEmv,
      PixType.addBalance(),
    );

    await this.pixTransactionRepository.save(pixTransaction);

    return {
      customerId,
      transactionId: pixTransaction.transactionId,
      referenceId: pixTransaction.referenceId,
      status: pixTransaction.status.getValue(),
      expirationDate: pix.expirationDate,
      pixKey: pixTransaction.pixKey ?? "",
      pixQrCode: pixTransaction.pixQrCode ?? "",
      pixEmv: pixTransaction.pixEmv ?? "",
      amountInCents: pixTransaction.amount.getValue(),
      description: pix.description ?? "",
      pixType: pixTransaction.pixType?.getValue() ?? "",
    };
  }
}
