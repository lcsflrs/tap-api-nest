import { Adjustment } from "../../../domain/adjustment/adjustment.aggregate";
import { Uuid } from "../../../domain/@shared/interfaces/uuid";

export interface IAdjustmentRepository {
  save(adjustment: Adjustment): Promise<void>;
  findById(id: Uuid): Promise<Adjustment | null>;
  findMany(clientId?: Uuid): Promise<Adjustment[]>;
  update(adjustment: Adjustment): Promise<void>;
}
