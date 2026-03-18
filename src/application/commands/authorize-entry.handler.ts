import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import {
  AuthorizeEntryCommand,
  AuthorizeEntryResult,
} from "./dtos/authorize-entry.command";
import type { ICustomerRepository } from "@infrastructure/repositories/interfaces/customer-repository.interface";
import type { IIngressRepository } from "@infrastructure/repositories/interfaces/ingress-repository.interface";
import type { IPartyRepository } from "@infrastructure/repositories/interfaces/party-repository.interface";
import { Ingress } from "@domain/ingress/ingress.aggregate";
import { IngressID } from "@domain/ingress/ingress-id.value";
import { CustomerID } from "@domain/customer/customer-id.value";
import { PartyID } from "@domain/party/party-id.value";
import { IngressStatusID } from "@domain/party/ingress-status-id.value";

const DOCUMENT_BLACKLIST = ["05103273543"];

@CommandHandler(AuthorizeEntryCommand)
export class AuthorizeEntryHandler implements ICommandHandler<
  AuthorizeEntryCommand,
  AuthorizeEntryResult
> {
  constructor(
    @Inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository,
    @Inject("IngressRepository")
    private readonly ingressRepository: IIngressRepository,
    @Inject("PartyRepository")
    private readonly partyRepository: IPartyRepository,
  ) {}

  async execute(command: AuthorizeEntryCommand): Promise<AuthorizeEntryResult> {
    const { document, partyId, valueInCents } = command;

    if (DOCUMENT_BLACKLIST.includes(document)) {
      throw new Error("Invalid document");
    }

    const customer = await this.customerRepository.findByDocument(document);

    if (!customer) {
      throw new Error("Customer not found");
    }

    const party = await this.partyRepository.findById(partyId);

    if (!party) {
      throw new Error("Party not found");
    }

    const customerId = customer.getId().getValue();

    const invite = await this.partyRepository.findInviteByDocumentAndParty(
      document,
      partyId,
    );

    if (invite?.ingressId) {
      throw new Error("Document already has an ingress for this party");
    }

    const existingIngress =
      await this.ingressRepository.findActiveByCustomerAndParty(
        customerId,
        partyId,
      );

    if (existingIngress) {
      throw new Error("Ingress already bought");
    }

    const ingress = Ingress.create(
      new IngressID(0),
      new PartyID(partyId),
      new IngressStatusID(2),
      4,
      new CustomerID(customerId),
      valueInCents,
      null,
      null,
      null,
    );

    const savedIngress = await this.ingressRepository.create(ingress);

    if (invite) {
      await this.partyRepository.setIngressIdOnInvite(
        invite.id,
        savedIngress.getId().getValue(),
      );
    }

    return { ingressId: savedIngress.getId().getValue() };
  }
}
