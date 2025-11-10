import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject, NotFoundException } from "@nestjs/common";
import { IPayoutRepository } from "src/infrastructure/repositories/interfaces/payout-repository.interface";
import { FindPayoutByIdQuery } from "./dtos/find-payout-by-id.query";
import { Uuid } from "src/domain/@shared/interfaces/uuid";

@QueryHandler(FindPayoutByIdQuery)
export class FindPayoutByIdHandler
  implements IQueryHandler<FindPayoutByIdQuery, FindPayoutByIdResult>
{
  constructor(
    @Inject("PayoutRepository")
    private readonly payoutRepository: IPayoutRepository,
  ) {}

  async execute(query: FindPayoutByIdQuery): Promise<FindPayoutByIdResult> {
    const payout = await this.payoutRepository.findById(new Uuid(query.id));

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
  updatedAt: Date;
  items: Array<{
    id: string;
    payoutId: string;
    amountInCents: number;
    consumptionId: string;
  }>;
}
