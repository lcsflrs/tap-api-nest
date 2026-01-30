import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { FindPaidPayoutsQuery } from "./dtos/find-paid-payouts.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import { payouts_status } from "@infrastructure/prisma/generated/prisma";

@QueryHandler(FindPaidPayoutsQuery)
export class FindPaidPayoutsHandler implements IQueryHandler<FindPaidPayoutsQuery> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: FindPaidPayoutsQuery) {
    const { storeName, status, page, limit } = query;

    const where = {
      ...(storeName && {
        storeName: {
          contains: storeName,
        },
      }),
      ...(status && { status: status as payouts_status }),
    };

    const currentPage = Math.max(page, 1);
    const take = Math.max(limit, 1);
    const skip = (currentPage - 1) * take;

    const [totalPayouts, payouts] = await Promise.all([
      this.prisma.payout.count({ where }),
      this.prisma.payout.findMany({
        where,
        include: {
          items: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take,
      }),
    ]);

    const totalPages = Math.ceil(totalPayouts / take);

    return {
      payouts,
      totalPayouts,
      currentPage,
      totalPages,
    };
  }
}
