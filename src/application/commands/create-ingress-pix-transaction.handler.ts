import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { randomBytes, randomUUID } from "crypto";
import { CreateIngressPixTransactionCommand } from "./dtos/create-ingress-pix-transaction.command";
import type { IPixTransactionRepository } from "@infrastructure/repositories/interfaces/pix-transaction-repository.interface";
import type { ICustomerRepository } from "@infrastructure/repositories/interfaces/customer-repository.interface";
import type { IIngressRepository } from "@infrastructure/repositories/interfaces/ingress-repository.interface";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";
import { PixTransaction } from "@domain/payment/pix-transaction.aggregate";
import { PixTransactionID } from "@domain/payment/pix-transaction-id.value";
import { PixStatus } from "@domain/payment/pix-status.value";
import { PixType } from "@domain/payment/pix-type.value";
import { isProdEnv } from "src/utils/is-prod-env";

const INGRESS_PIX_TTL_MINUTES = 30;
const HML_PIX_KEY = "00020126580014BR.GOV.BCB.PIXFICTICIO";
const HML_DESCRIPTION = "Pix Ingresso em hml";
const HML_STATEMENT_DESCRIPTOR = "Tap";

@CommandHandler(CreateIngressPixTransactionCommand)
export class CreateIngressPixTransactionHandler implements ICommandHandler<CreateIngressPixTransactionCommand> {
  constructor(
    @Inject("PixTransactionRepository")
    private readonly pixTransactionRepository: IPixTransactionRepository,
    @Inject("IngressRepository")
    private readonly ingressRepository: IIngressRepository,
    @Inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository,
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
  ) {}

  async execute(command: CreateIngressPixTransactionCommand) {
    const { customerId, partyId } = command;

    const referenceId = `${partyId}-${randomUUID()}`;

    const batch = await this.ingressRepository.findActiveBatch(partyId);

    if (!batch) {
      throw new Error("Active ingress batch not found");
    }

    const expirationDate = new Date(
      Date.now() + INGRESS_PIX_TTL_MINUTES * 60 * 1000,
    ).toISOString();

    if (isProdEnv()) {
      const customer = await this.customerRepository.findById(customerId);

      if (!customer) {
        throw new Error("Customer not found");
      }

      if (!customer.ioCustomerId) {
        throw new Error("Customer has no ioCustomerId");
      }

      const authResponse = await this.paymentGateway.getAuthToken();
      const authToken: string = authResponse.data.access_token;

      const pix = await this.paymentGateway.generatePixTransaction(
        customer.ioCustomerId,
        {
          amount: batch.priceInCents,
          reference_id: referenceId,
          description: `Compra de Ingresso${batch.name ? ` - ${batch.name}` : ""}`,
          statement_descriptor: HML_STATEMENT_DESCRIPTOR,
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
        PixType.buyTicket(),
      );

      await this.pixTransactionRepository.save(pixTransaction);

      return {
        customerId,
        transactionId: pixTransaction.transactionId,
        referenceId: pixTransaction.referenceId,
        status: pixTransaction.status.getValue(),
        expirationDate: pix.expirationDate,
        pixEmv: pixTransaction.pixEmv ?? "",
        priceInCents: pixTransaction.amount.getValue(),
        description: pix.description ?? "",
        pixType: pixTransaction.pixType?.getValue() ?? "",
        partyId,
      };
    }

    const transactionId = randomBytes(16).toString("hex");
    const pixEmv =
      `00020126580014BR.GOV.BCB.PIX01${transactionId}520400005303986540${batch.priceInCents.toFixed(2)}5802BRR5925Pix Dev Teste6009Sao Paulo62070503***6304B14F`.replace(
        /\s+/g,
        "",
      );

    const pix = PixTransaction.create(
      new PixTransactionID(0),
      customerId,
      null,
      transactionId,
      referenceId,
      PixStatus.paid(),
      expirationDate,
      HML_PIX_KEY,
      "",
      batch.priceInCents,
      HML_DESCRIPTION,
      pixEmv,
      PixType.buyTicket(),
    );

    await this.pixTransactionRepository.save(pix);

    return {
      customerId,
      transactionId: pix.transactionId,
      referenceId: pix.referenceId,
      status: pix.status.getValue(),
      expirationDate,
      pixEmv: pix.pixEmv ?? "",
      priceInCents: pix.amount.getValue(),
      description: HML_DESCRIPTION,
      pixType: pix.pixType?.getValue() ?? "",
      partyId,
    };
  }
}
