import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { IIngressRepository } from "./interfaces/ingress-repository.interface";
import { Ingress } from "@domain/ingress/ingress.aggregate";
import { IngressID } from "@domain/ingress/ingress-id.value";
import { CustomerID } from "@domain/customer/customer-id.value";
import { PartyID } from "@domain/party/party-id.value";
import { IngressMapper } from "@infrastructure/mappers/ingress.mapper";

@Injectable()
export class IngressRepository implements IIngressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(ingress: Ingress): Promise<Ingress> {
    const data = IngressMapper.toPersistence(ingress);
    const { id, ...createData } = data;

    const created = await this.prisma.ingress.create({
      data: createData,
    });

    return IngressMapper.toDomain(created);
  }

  async save(ingress: Ingress): Promise<void> {
    const data = IngressMapper.toPersistence(ingress);

    const { id, ...updateData } = data;

    await this.prisma.ingress.update({
      where: { id },
      data: updateData,
    });
  }

  async findById(id: IngressID): Promise<Ingress | null> {
    const ingress = await this.prisma.ingress.findUnique({
      where: { id: id.getValue() },
    });

    if (!ingress) {
      return null;
    }

    return IngressMapper.toDomain(ingress);
  }

  async findByCustomerAndParty(
    customerId: CustomerID,
    partyId: PartyID,
  ): Promise<Ingress[]> {
    const ingresses = await this.prisma.ingress.findMany({
      where: {
        customerId: customerId.getValue(),
        partyId: partyId.getValue(),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return ingresses.map(IngressMapper.toDomain);
  }

  async findActiveBatch(
    partyId: number,
  ): Promise<{ id: number; priceInCents: number; name: string } | null> {
    const batch = await this.prisma.ingressBatch.findFirst({
      where: { partyId, isActive: true },
      select: { id: true, priceInCents: true, name: true },
    });

    if (!batch) {
      return null;
    }

    return { id: batch.id, priceInCents: batch.priceInCents, name: batch.name };
  }

  async delete(id: IngressID): Promise<void> {
    await this.prisma.ingress.delete({
      where: { id: id.getValue() },
    });
  }

  async findActiveByCustomerAndBatch(
    customerId: number,
    batchId: number,
  ): Promise<Ingress | null> {
    const ingress = await this.prisma.ingress.findFirst({
      where: {
        customerId,
        ingressBatchId: batchId,
        ingressStatusId: 2,
      },
    });

    if (!ingress) return null;

    return IngressMapper.toDomain(ingress);
  }

  async findActiveByDocumentAndParty(
    document: string,
    partyId: number,
  ): Promise<Ingress | null> {
    const ingress = await this.prisma.ingress.findFirst({
      where: {
        partyId,
        ingressStatusId: 2,
        customer: { document },
      },
    });

    if (!ingress) {
      return null;
    }

    return IngressMapper.toDomain(ingress);
  }

  async findActiveByCustomerAndParty(
    customerId: number,
    partyId: number,
  ): Promise<Ingress | null> {
    const ingress = await this.prisma.ingress.findFirst({
      where: {
        customerId,
        partyId,
        ingressStatusId: 2,
      },
    });

    if (!ingress) {
      return null;
    }

    return IngressMapper.toDomain(ingress);
  }
}
