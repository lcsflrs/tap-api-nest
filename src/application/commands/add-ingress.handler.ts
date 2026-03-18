import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { AddIngressCommand } from "./dtos/add-ingress.command";
import type { IIngressRepository } from "@infrastructure/repositories/interfaces/ingress-repository.interface";
import { Ingress } from "@domain/ingress/ingress.aggregate";
import { IngressID } from "@domain/ingress/ingress-id.value";
import { CustomerID } from "@domain/customer/customer-id.value";
import { PartyID } from "@domain/party/party-id.value";
import { IngressStatusID } from "@domain/party/ingress-status-id.value";
import { PaymentMethod } from "@domain/@shared/value-objects/payment-method.value";
import { IngressBatchID } from "@domain/party/ingress-batch-id.value";

@CommandHandler(AddIngressCommand)
export class AddIngressHandler implements ICommandHandler<AddIngressCommand> {
  constructor(
    @Inject("IngressRepository")
    private readonly ingressRepository: IIngressRepository,
  ) {}

  async execute(command: AddIngressCommand) {
    const { customerId, partyId, transactionId } = command;

    const batch = await this.ingressRepository.findActiveBatch(partyId);

    if (!batch) {
      throw new Error("active ingress batch not found");
    }

    const ingress = Ingress.create(
      new IngressID(0),
      new PartyID(partyId),
      new IngressStatusID(2),
      PaymentMethod.PIX_ID,
      new CustomerID(customerId),
      batch.priceInCents,
      null,
      transactionId,
      new IngressBatchID(batch.id),
    );

    await this.ingressRepository.create(ingress);

    const [persisted] = await this.ingressRepository.findByCustomerAndParty(
      new CustomerID(customerId),
      new PartyID(partyId),
    );

    if (!persisted) {
      throw new Error("failed to retrieve created ingress");
    }

    return {
      ingressId: persisted.getId().getValue(),
      customerId: persisted.customerId.getValue(),
      paymentMethodId: persisted.paymentMethod.toId(),
      ingressStatusId: persisted.ingressStatusId.getValue(),
      partyId: persisted.partyId.getValue(),
      ingressBatchId: persisted.ingressBatchId?.getValue() ?? undefined,
      transactionId: persisted.transactionId ?? undefined,
      valueInCents: persisted.valueInCents ?? undefined,
    };
  }
}
