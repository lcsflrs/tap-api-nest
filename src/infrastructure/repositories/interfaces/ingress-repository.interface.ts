import { Ingress } from "@domain/ingress/ingress.aggregate";
import { IngressID } from "@domain/ingress/ingress-id.value";
import { CustomerID } from "@domain/customer/customer-id.value";
import { PartyID } from "@domain/party/party-id.value";

export interface IIngressRepository {
  create(ingress: Ingress): Promise<Ingress>;
  save(ingress: Ingress): Promise<void>;
  findById(id: IngressID): Promise<Ingress | null>;
  findByCustomerAndParty(
    customerId: CustomerID,
    partyId: PartyID,
  ): Promise<Ingress[]>;
  findActiveBatch(
    partyId: number,
  ): Promise<{ id: number; priceInCents: number; name: string } | null>;
  findActiveByCustomerAndBatch(
    customerId: number,
    batchId: number,
  ): Promise<Ingress | null>;
  findActiveByDocumentAndParty(
    document: string,
    partyId: number,
  ): Promise<Ingress | null>;
  findActiveByCustomerAndParty(
    customerId: number,
    partyId: number,
  ): Promise<Ingress | null>;
  delete(id: IngressID): Promise<void>;
}
