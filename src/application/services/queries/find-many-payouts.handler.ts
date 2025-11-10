import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { IPayoutRepository } from "src/infrastructure/repositories/interfaces/payout-repository.interface";
import { FindManyPayoutsQuery } from "./dtos/find-many-payouts.query";
import { PayoutStatus } from "src/domain/@shared/value-objects/payout-status.value";

@QueryHandler(FindManyPayoutsQuery)
export class FindManyPayoutsHandler
  implements IQueryHandler<FindManyPayoutsQuery, FindManyPayoutsResult>
{
  constructor(
    @Inject("PayoutRepository")
    private readonly payoutRepository: IPayoutRepository,
  ) {}

  async execute(query: FindManyPayoutsQuery): Promise<FindManyPayoutsResult> {
    return await this.payoutRepository.findMany(
      query.page,
      query.limit,
      query.clientId,
      query.status ? PayoutStatus.fromString(query.status) : undefined,
    );
  }
}

interface FindManyPayoutsResult {
  payouts: Payout[];
  totalPages: number;
}

interface Payout {
  id: string;
  clientId: string;
  grossInCents: number;
  feeInCents: number;
  netInCents: number;
  status: string;
  paidAt: Date | null;
  proofFileUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  items: Array<{
    id: string;
    payoutId: string;
    amountInCents: number;
    consumptionId: string;
  }>;
}
