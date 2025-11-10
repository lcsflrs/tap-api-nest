import { Query } from "@nestjs/cqrs";

export class FindAdjustmentByIdQuery extends Query<{
  id: string;
  clientId: string;
  valueInCents: number;
  reason: string;
  attachment: string | null;
}> {
  constructor(public readonly id: string) {
    super();
  }
}
