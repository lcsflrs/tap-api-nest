import { Injectable } from "@nestjs/common";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import type { IPartyRepository } from "./interfaces/party-repository.interface";
import { Party } from "@domain/party/party.aggregate";
import { Promoter } from "@domain/party/promoter.entity";
import { PartyMapper } from "@infrastructure/mappers/party.mapper";

@Injectable()
export class PartyRepository implements IPartyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(party: Party): Promise<void> {
    const data = PartyMapper.toPersistence(party);
    const { id, accessUserId, ...updateData } = data;

    await this.prisma.party.upsert({
      where: { id: id ?? 0 },
      create: { ...updateData, accessUserId },
      update: updateData,
    });
  }

  async updateActiveBatch(
    partyId: number,
    activeBatchId: number | null,
  ): Promise<void> {
    await this.prisma.ingressBatch.updateMany({
      where: { partyId },
      data: { isActive: false },
    });

    if (activeBatchId !== null) {
      await this.prisma.ingressBatch.update({
        where: { id: activeBatchId },
        data: { isActive: true },
      });
    }
  }

  async addPromoter(promoter: Promoter): Promise<void> {
    const data = PartyMapper.promoterToPersistence(promoter);

    await this.prisma.promoter.create({ data });
  }

  async findById(id: number): Promise<Party | null> {
    const party = await this.prisma.party.findUnique({
      where: { id },
    });

    if (!party) {
      return null;
    }

    return PartyMapper.toDomain(party);
  }

  async findByIdWithBatches(id: number): Promise<Party | null> {
    const party = await this.prisma.party.findUnique({
      where: { id },
      include: { batches: true },
    });

    if (!party) {
      return null;
    }

    return PartyMapper.toDomain(party);
  }

  async findByIdWithPromoters(id: number): Promise<Party | null> {
    const party = await this.prisma.party.findUnique({
      where: { id },
      include: { promoters: true },
    });

    if (!party) {
      return null;
    }

    return PartyMapper.toDomain(party);
  }

  async findInviteByDocumentAndParty(
    document: string,
    partyId: number,
  ): Promise<{
    id: number;
    ingressId: number | null;
    invitedByCustomerId: number | null;
  } | null> {
    return this.prisma.invite.findFirst({
      where: { document, partyId },
      select: { id: true, ingressId: true, invitedByCustomerId: true },
    });
  }

  async setIngressIdOnInvite(
    inviteId: number,
    ingressId: number,
  ): Promise<void> {
    await this.prisma.invite.update({
      where: { id: inviteId },
      data: { ingressId },
    });
  }

  async setIngressIdOnInviteByDocument(
    document: string,
    ingressId: number,
  ): Promise<void> {
    await this.prisma.invite.updateMany({
      where: { document },
      data: { ingressId },
    });
  }

  async linkInvitesByPhone(
    phone: string,
    customerId: number,
  ): Promise<number[]> {
    const invites = await this.prisma.invite.findMany({
      where: { phone },
    });

    if (invites.length === 0) {
      return [];
    }

    await this.prisma.invite.updateMany({
      where: { phone },
      data: { invitedByCustomerId: customerId },
    });

    return invites.map((invite) => invite.partyId);
  }

  async countInvitesWithIngressByPromoter(
    customerId: number,
    partyId: number,
  ): Promise<number> {
    return this.prisma.invite.count({
      where: {
        invitedByCustomerId: customerId,
        partyId,
        ingressId: { not: null },
      },
    });
  }

  async addPromoterBonus(
    customerId: number,
    partyId: number,
    amountInCents: number,
  ): Promise<void> {
    await this.prisma.promoter.updateMany({
      where: { customerId, partyId },
      data: { bonusInCents: { increment: amountInCents } },
    });
  }

  async getPromoterBonus(customerId: number, partyId: number): Promise<number> {
    const promoter = await this.prisma.promoter.findFirst({
      where: { customerId, partyId },
      select: { bonusInCents: true },
    });

    return promoter?.bonusInCents ?? 0;
  }
}
