import { Payout } from "../../../domain/payout/payout.aggregate";
import { PayoutStatus } from "../../../domain/@shared/value-objects/payout-status.value";
import { Uuid } from "../../../domain/@shared/interfaces/uuid";

export interface IPayoutRepository {
  save(payout: Payout): Promise<void>;
  findById(id: Uuid): Promise<Payout | null>;
  findMany(
    page: number,
    limit: number,
    clientId?: string,
    status?: PayoutStatus,
  ): Promise<{ payouts: Payout[]; totalPages: number }>;
  update(payout: Payout): Promise<void>;
}
