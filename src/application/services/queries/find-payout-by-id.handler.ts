import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { FindPayoutByIdQuery } from "./dtos/find-payout-by-id.query";

@QueryHandler(FindPayoutByIdQuery)
export class FindPayoutByIdHandler
  implements IQueryHandler<FindPayoutByIdQuery, FindPayoutByIdResult>
{
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: FindPayoutByIdQuery): Promise<FindPayoutByIdResult> {
    const payout = await this.prisma.payout.findUnique({
      where: { id: query.id },
      include: { items: true },
    });

    if (!payout) {
      throw new NotFoundException("Payout not found");
    }

    return payout;
  }
}

interface FindPayoutByIdResult {
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
