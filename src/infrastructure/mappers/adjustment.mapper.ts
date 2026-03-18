import { Adjustment as PrismaAdjustment } from "@infrastructure/prisma/generated/prisma";
import { Adjustment } from "@domain/adjustment/adjustment.aggregate";
import { Money } from "@domain/@shared/value-objects/money.value";
import { Uuid } from "@domain/@shared/interfaces/uuid";

export class AdjustmentMapper {
  static toDomain(prismaAdjustment: PrismaAdjustment): Adjustment {
    return new Adjustment(
      new Uuid(prismaAdjustment.id),
      Money.create(prismaAdjustment.valueInCents),
      prismaAdjustment.reason,
      prismaAdjustment.type,
      prismaAdjustment.attachment ?? undefined,
    );
  }

  static toPersistence(adjustment: Adjustment) {
    return {
      id: adjustment.getId().getValue(),
      valueInCents: adjustment.valueInCents.getValue(),
      reason: adjustment.reason,
      type: adjustment.type,
      attachment: adjustment.attachment,
    };
  }
}
