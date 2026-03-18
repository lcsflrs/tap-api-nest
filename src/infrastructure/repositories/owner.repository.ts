import { Injectable } from "@nestjs/common";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import type { IOwnerRepository } from "./interfaces/owner-repository.interface";
import { Owner } from "@domain/owner/owner.aggregate";
import { OwnerMapper } from "@infrastructure/mappers/owner.mapper";

@Injectable()
export class OwnerRepository implements IOwnerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(owner: Owner): Promise<void> {
    const data = OwnerMapper.toPersistence(owner);
    const { id, accessUserId, ...updateData } = data;

    await this.prisma.owner.upsert({
      where: { id: id ?? 0 },
      create: {
        ...updateData,
        accessUserId: accessUserId!,
      },
      update: updateData,
    });
  }

  async findById(id: number): Promise<Owner | null> {
    const owner = await this.prisma.owner.findUnique({
      where: { id },
    });

    if (!owner) {
      return null;
    }

    return OwnerMapper.toDomain(owner);
  }

  async findByDocument(document: string): Promise<Owner | null> {
    const owner = await this.prisma.owner.findFirst({
      where: { document },
    });

    if (!owner) {
      return null;
    }

    return OwnerMapper.toDomain(owner);
  }

  async findByAccessUserId(accessUserId: number): Promise<Owner | null> {
    const owner = await this.prisma.owner.findFirst({
      where: { accessUserId },
    });

    if (!owner) {
      return null;
    }

    return OwnerMapper.toDomain(owner);
  }

  async findByAccessUserIdWithStores(
    accessUserId: number,
  ): Promise<Owner | null> {
    const owner = await this.prisma.owner.findFirst({
      where: { accessUserId },
      include: { stores: true },
    });

    if (!owner) {
      return null;
    }

    return OwnerMapper.toDomain(owner);
  }

  async updateIoCustomerId(
    ownerId: number,
    ioCustomerId: string,
  ): Promise<void> {
    await this.prisma.owner.update({
      where: { id: ownerId },
      data: { ioCustomerId },
    });
  }
}
