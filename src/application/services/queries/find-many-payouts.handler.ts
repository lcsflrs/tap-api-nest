import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { FindManyPayoutsQuery } from "./dtos/find-many-payouts.query";

@QueryHandler(FindManyPayoutsQuery)
export class FindManyPayoutsHandler
  implements IQueryHandler<FindManyPayoutsQuery>
{
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: FindManyPayoutsQuery): Promise<FindManyPayoutsResult> {
    const { clientId, status, limit, page } = query;

    const where = {
      ...(clientId && { clientId }),
      ...(status && { status }),
    };

    const take = Math.max(limit, 1);
    const skip = (Math.max(page, 1) - 1) * take;

    const [total, payouts] = await Promise.all([
      this.prisma.payout.count({ where }),
      this.prisma.payout.findMany({
        where,
        include: { items: true },
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      payouts,
      totalPages,
    };
  }
}

interface PayoutType {
  id: string;
  clientId: string;
  grossInCents: number;
  feeInCents: number;
  netInCents: number;
  status: string;
  paidAt: Date | null;
  proofFileUrl: string | null;
  createdAt: Date;
  payoutDate: Date;
  updatedAt: Date;
  items: Array<{
    id: string;
    payoutId: string;
    amountInCents: number;
    consumptionId: string;
  }>;
}

interface FindManyPayoutsResult {
  payouts: PayoutType[];
  totalPages: number;
}
