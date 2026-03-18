import { CommandHandler, ICommandHandler, CommandBus } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import {
  BuyEventIngressCommand,
  BuyEventIngressResult,
} from "./dtos/buy-event-ingress.command";
import type { ICustomerRepository } from "@infrastructure/repositories/interfaces/customer-repository.interface";
import type { IIngressRepository } from "@infrastructure/repositories/interfaces/ingress-repository.interface";
import type { IPartyRepository } from "@infrastructure/repositories/interfaces/party-repository.interface";
import { Ingress } from "@domain/ingress/ingress.aggregate";
import { IngressID } from "@domain/ingress/ingress-id.value";
import { PartyID } from "@domain/party/party-id.value";
import { CustomerID } from "@domain/customer/customer-id.value";
import { IngressStatusID } from "@domain/party/ingress-status-id.value";
import { IngressBatchID } from "@domain/party/ingress-batch-id.value";
import {
  ExecuteCreditTransactionCommand,
  ExecuteCreditTransactionResult,
} from "@infrastructure/third-party/iopay/commands/dtos/execute-credit-transaction.command";

@CommandHandler(BuyEventIngressCommand)
export class BuyEventIngressHandler implements ICommandHandler<
  BuyEventIngressCommand,
  BuyEventIngressResult
> {
  constructor(
    @Inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository,
    @Inject("IngressRepository")
    private readonly ingressRepository: IIngressRepository,
    @Inject("PartyRepository")
    private readonly partyRepository: IPartyRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(
    command: BuyEventIngressCommand,
  ): Promise<BuyEventIngressResult> {
    const { customerId, partyId, ingressBatchId } = command;

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new Error("Customer not found");
    }

    if (!customer.wallet?.defaultCreditCardId) {
      throw new Error("Customer has no default card");
    }

    if (!customer.ioCustomerId) {
      throw new Error("Customer has no ioCustomerId");
    }

    const party = await this.partyRepository.findByIdWithBatches(partyId);

    if (!party) {
      throw new Error("Party not found");
    }

    const ingressBatch = party.availableBatches.find(
      (b) => b.getId().getValue() === ingressBatchId,
    );

    if (!ingressBatch) {
      throw new Error("Ingress batch not found or unavailable");
    }

    const existingByDocument =
      await this.ingressRepository.findActiveByDocumentAndParty(
        customer.document!.getValue(),
        partyId,
      );

    if (existingByDocument) {
      throw new Error("Document already has an ingress for this party");
    }

    const existingByBatch =
      await this.ingressRepository.findActiveByCustomerAndBatch(
        customerId,
        ingressBatchId,
      );

    if (existingByBatch) {
      throw new Error("Ingress already bought");
    }

    const { transactionId } = await this.commandBus.execute<
      ExecuteCreditTransactionCommand,
      ExecuteCreditTransactionResult
    >(
      new ExecuteCreditTransactionCommand(
        customer.ioCustomerId,
        customer.wallet.defaultCreditCardId,
        ingressBatch.priceInCents,
        1,
        `${partyId}-${ingressBatchId}-${customerId}`,
        `${party.name} ${ingressBatch.name}`,
        party.name,
        [
          {
            id: String(ingressBatchId),
            name: `${party.name} ${ingressBatch.name}`,
            priceInCents: ingressBatch.priceInCents,
            quantity: 1,
          },
        ],
      ),
    );

    const ingress = Ingress.create(
      new IngressID(0),
      new PartyID(partyId),
      new IngressStatusID(2),
      2,
      new CustomerID(customerId),
      null,
      null,
      transactionId,
      new IngressBatchID(ingressBatchId),
    );

    const savedIngress = await this.ingressRepository.create(ingress);

    await this.partyRepository.setIngressIdOnInviteByDocument(
      customer.document!.getValue(),
      savedIngress.getId().getValue(),
    );

    return {
      ingressId: savedIngress.getId().getValue(),
      transactionId,
    };
  }
}
