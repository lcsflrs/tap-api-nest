import { Adjustment } from "../../../domain/adjustment/adjustment.aggregate";
import { Uuid } from "../../../domain/@shared/interfaces/uuid";

export interface IAdjustmentRepository {
  save(adjustment: Adjustment): Promise<void>;
  findById(id: Uuid): Promise<{
    id: string;
    clientId: string;
    valueInCents: number;
    reason: string;
    attachment: string | null;
  } | null>;
  findMany(
    page: number,
    limit: number,
    clientId?: Uuid,
  ): Promise<{
    adjustments: {
      id: string;
      clientId: string;
      valueInCents: number;
      reason: string;
      attachment: string | null;
    }[];
    totalPages: number;
  }>;
  update(adjustment: Adjustment): Promise<void>;
}
