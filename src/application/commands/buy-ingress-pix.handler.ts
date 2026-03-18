import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import {
  BuyIngressPixCommand,
  BuyIngressPixResult,
} from "./dtos/buy-ingress-pix.command";
import type { ICustomerRepository } from "@infrastructure/repositories/interfaces/customer-repository.interface";
import type { IIngressRepository } from "@infrastructure/repositories/interfaces/ingress-repository.interface";
import type { IPartyRepository } from "@infrastructure/repositories/interfaces/party-repository.interface";
import { Ingress } from "@domain/ingress/ingress.aggregate";
import { IngressID } from "@domain/ingress/ingress-id.value";
import { PartyID } from "@domain/party/party-id.value";
import { CustomerID } from "@domain/customer/customer-id.value";
import { IngressStatusID } from "@domain/party/ingress-status-id.value";
import { IngressBatchID } from "@domain/party/ingress-batch-id.value";

@CommandHandler(BuyIngressPixCommand)
export class BuyIngressPixHandler implements ICommandHandler<
  BuyIngressPixCommand,
  BuyIngressPixResult
> {
  constructor(
    @Inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository,
    @Inject("IngressRepository")
    private readonly ingressRepository: IIngressRepository,
    @Inject("PartyRepository")
    private readonly partyRepository: IPartyRepository,
  ) {}

  async execute(command: BuyIngressPixCommand): Promise<BuyIngressPixResult> {
    const { document, partyId } = command;

    const customer = await this.customerRepository.findByDocument(document);

    if (!customer) {
      throw new Error("Customer not found");
    }

    const invite = await this.partyRepository.findInviteByDocumentAndParty(
      document,
      partyId,
    );

    if (!invite) {
      throw new Error("Not invited");
    }

    if (invite.ingressId) {
      throw new Error("Document already has an ingress for this party");
    }

    const party = await this.partyRepository.findByIdWithBatches(partyId);

    if (!party) {
      throw new Error("Party not found");
    }

    if (party.availableBatches.length === 0) {
      throw new Error("No active ingress batch found");
    }

    const existingIngress =
      await this.ingressRepository.findActiveByCustomerAndParty(
        customer.getId().getValue(),
        partyId,
      );

    if (existingIngress) {
      throw new Error("Ingress already bought");
    }

    const firstBatch = party.availableBatches[0];

    const ingress = Ingress.create(
      new IngressID(0),
      new PartyID(partyId),
      new IngressStatusID(2),
      4,
      new CustomerID(customer.getId().getValue()),
      null,
      null,
      null,
      new IngressBatchID(firstBatch.getId().getValue()),
    );

    const savedIngress = await this.ingressRepository.create(ingress);

    await this.partyRepository.setIngressIdOnInvite(
      invite.id,
      savedIngress.getId().getValue(),
    );

    return { ingressId: savedIngress.getId().getValue() };
  }
}
