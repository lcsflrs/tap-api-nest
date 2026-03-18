import { CommandHandler, ICommandHandler, CommandBus } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { BuyIngressCommand } from "./dtos/buy-ingress.command";
import type { ICustomerRepository } from "@infrastructure/repositories/interfaces/customer-repository.interface";
import type { IIngressRepository } from "@infrastructure/repositories/interfaces/ingress-repository.interface";
import type { IPartyRepository } from "@infrastructure/repositories/interfaces/party-repository.interface";
import { Ingress } from "@domain/ingress/ingress.aggregate";
import { IngressID } from "@domain/ingress/ingress-id.value";
import { CustomerID } from "@domain/customer/customer-id.value";
import { PartyID } from "@domain/party/party-id.value";
import { IngressStatusID } from "@domain/party/ingress-status-id.value";
import { IngressBatchID } from "@domain/party/ingress-batch-id.value";
import {
  ExecuteCreditTransactionCommand,
  ExecuteCreditTransactionResult,
} from "@infrastructure/third-party/iopay/commands/dtos/execute-credit-transaction.command";

const PROMOTER_BONUS_PER_INGRESS_IN_CENTS = 500;
const PROMOTER_FREE_INGRESS_THRESHOLD = 5;
const PROMOTER_FREE_INGRESS_COST_IN_CENTS = 2500;

@CommandHandler(BuyIngressCommand)
export class BuyIngressHandler implements ICommandHandler<
  BuyIngressCommand,
  {
    ingressId: number;
    customerId: number;
    partyId: number;
    ingressBatchId: number;
    transactionId: string;
  }
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

  async execute(command: BuyIngressCommand) {
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

    const invite = await this.partyRepository.findInviteByDocumentAndParty(
      customer.document!.getValue(),
      partyId,
    );

    if (!invite) {
      throw new Error("Invite not found");
    }

    if (invite.ingressId) {
      throw new Error("Document already has an ingress for this party");
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

    const existingIngress =
      await this.ingressRepository.findActiveByCustomerAndBatch(
        customerId,
        ingressBatchId,
      );

    if (existingIngress) {
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

    await this.partyRepository.setIngressIdOnInvite(
      invite.id,
      savedIngress.getId().getValue(),
    );

    await this.handlePromoterBonus(
      invite.invitedByCustomerId,
      partyId,
      party.name,
    );

    return {
      ingressId: savedIngress.getId().getValue(),
      customerId,
      partyId,
      ingressBatchId,
      transactionId,
    };
  }

  private async handlePromoterBonus(
    invitedByCustomerId: number | null,
    partyId: number,
    partyName: string,
  ): Promise<void> {
    if (!invitedByCustomerId) {
      return;
    }

    const promoterIngress =
      await this.ingressRepository.findActiveByCustomerAndParty(
        invitedByCustomerId,
        partyId,
      );

    const confirmedInvites =
      await this.partyRepository.countInvitesWithIngressByPromoter(
        invitedByCustomerId,
        partyId,
      );

    await this.partyRepository.addPromoterBonus(
      invitedByCustomerId,
      partyId,
      PROMOTER_BONUS_PER_INGRESS_IN_CENTS,
    );

    if (
      confirmedInvites === PROMOTER_FREE_INGRESS_THRESHOLD &&
      !promoterIngress
    ) {
      const currentBonus = await this.partyRepository.getPromoterBonus(
        invitedByCustomerId,
        partyId,
      );

      if (currentBonus < PROMOTER_FREE_INGRESS_COST_IN_CENTS) {
        return;
      }

      await this.partyRepository.addPromoterBonus(
        invitedByCustomerId,
        partyId,
        -PROMOTER_FREE_INGRESS_COST_IN_CENTS,
      );

      const freeIngress = Ingress.create(
        new IngressID(0),
        new PartyID(partyId),
        new IngressStatusID(2),
        5,
        new CustomerID(invitedByCustomerId),
        null,
        null,
        null,
        null,
      );

      await this.ingressRepository.create(freeIngress);
    }
  }
}
