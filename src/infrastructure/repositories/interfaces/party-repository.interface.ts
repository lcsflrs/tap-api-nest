import { Party } from "@domain/party/party.aggregate";
import { Promoter } from "@domain/party/promoter.entity";

export interface IPartyRepository {
  findById(id: number): Promise<Party | null>;
  findByIdWithBatches(id: number): Promise<Party | null>;
  findByIdWithPromoters(id: number): Promise<Party | null>;
  findInviteByDocumentAndParty(
    document: string,
    partyId: number,
  ): Promise<{
    id: number;
    ingressId: number | null;
    invitedByCustomerId: number | null;
  } | null>;
  setIngressIdOnInvite(inviteId: number, ingressId: number): Promise<void>;
  setIngressIdOnInviteByDocument(
    document: string,
    ingressId: number,
  ): Promise<void>;
  save(party: Party): Promise<void>;
  updateActiveBatch(
    partyId: number,
    activeBatchId: number | null,
  ): Promise<void>;
  addPromoter(promoter: Promoter): Promise<void>;
  linkInvitesByPhone(phone: string, customerId: number): Promise<number[]>;
  countInvitesWithIngressByPromoter(
    customerId: number,
    partyId: number,
  ): Promise<number>;
  addPromoterBonus(
    customerId: number,
    partyId: number,
    amountInCents: number,
  ): Promise<void>;
  getPromoterBonus(customerId: number, partyId: number): Promise<number>;
}
