import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { FindAccessUserQuery } from "./dtos/find-access-user.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(FindAccessUserQuery)
export class FindAccessUserHandler implements IQueryHandler<FindAccessUserQuery> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: FindAccessUserQuery) {
    const { field, value } = query;

    const accessUser =
      field === "email"
        ? await this.prisma.accessUser.findUnique({ where: { email: value } })
        : await this.prisma.accessUser.findUnique({
            where: { id: Number(value) },
          });

    if (!accessUser) {
      return null;
    }

    return {
      id: accessUser.id,
      name: accessUser.name,
      email: accessUser.email,
      phone: accessUser.phone ?? "",
      document: accessUser.document,
      emailVerified: accessUser.emailVerified ?? false,
      phoneVerified: accessUser.phoneVerified ?? false,
      isFirstAccess: accessUser.firstAccess ?? true,
    };
  }
}
