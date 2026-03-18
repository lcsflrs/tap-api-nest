import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { IAccessUserRepository } from "./interfaces/access-user-repository.interface";
import { AccessUser } from "@domain/access-user/access-user.aggregate";
import { AccessUserID } from "@domain/access-user/access-user-id.value";
import { AccessUserMapper } from "@infrastructure/mappers/access-user.mapper";

@Injectable()
export class AccessUserRepository implements IAccessUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(accessUser: AccessUser): Promise<void> {
    const data = AccessUserMapper.toPersistence(accessUser);

    const { id, ...createData } = data;

    await this.prisma.accessUser.create({
      data: createData,
    });
  }

  async save(accessUser: AccessUser): Promise<void> {
    const data = AccessUserMapper.toPersistence(accessUser);

    const { id, ...updateData } = data;

    await this.prisma.accessUser.update({
      where: { id },
      data: updateData,
    });
  }

  async findById(id: AccessUserID): Promise<AccessUser | null> {
    const user = await this.prisma.accessUser.findUnique({
      where: { id: id.getValue() },
    });

    if (!user) {
      return null;
    }

    return AccessUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<AccessUser | null> {
    const user = await this.prisma.accessUser.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return AccessUserMapper.toDomain(user);
  }

  async delete(id: AccessUserID): Promise<void> {
    await this.prisma.accessUser.delete({
      where: { id: id.getValue() },
    });
  }
}
