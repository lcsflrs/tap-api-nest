import { Payout } from "../../../domain/payout/payout.aggregate";
import { Uuid } from "../../../domain/@shared/interfaces/uuid";

export interface IPayoutRepository {
  save(payout: Payout): Promise<void>;
  findById(id: Uuid): Promise<Payout | null>;
  update(payout: Payout): Promise<void>;
}
