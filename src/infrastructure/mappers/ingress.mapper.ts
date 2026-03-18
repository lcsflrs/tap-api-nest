import { Ingress } from "@domain/ingress/ingress.aggregate";
import { IngressID } from "@domain/ingress/ingress-id.value";
import { PartyID } from "@domain/party/party-id.value";
import { CustomerID } from "@domain/customer/customer-id.value";
import { IngressStatusID } from "@domain/party/ingress-status-id.value";
import { IngressBatchID } from "@domain/party/ingress-batch-id.value";
import { PaymentMethod } from "@domain/@shared/value-objects/payment-method.value";

export class IngressMapper {
  static toDomain(ingress: any): Ingress {
    return new Ingress(
      new IngressID(ingress.id),
      new PartyID(ingress.partyId),
      new IngressStatusID(ingress.ingressStatusId),
      ingress.ingressBatchId
        ? new IngressBatchID(ingress.ingressBatchId)
        : null,
      PaymentMethod.fromId(ingress.paymentMethodId),
      new CustomerID(ingress.customerId),
      ingress.valueInCents ?? null,
      ingress.braceletNumber ?? null,
      ingress.transactionId ?? null,
    );
  }

  static toPersistence(ingress: Ingress) {
    const json = ingress.toJSON();

    return {
      id: json.id,
      transactionId: json.transactionId,
      partyId: json.partyId,
      ingressStatusId: json.ingressStatusId,
      ingressBatchId: json.ingressBatchId,
      paymentMethodId: json.paymentMethodId,
      customerId: json.customerId,
      valueInCents: json.valueInCents,
      braceletNumber: json.braceletNumber,
    };
  }
}
