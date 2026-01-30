import { Query } from "@nestjs/cqrs";

export class FindManyAdjustmentsQuery extends Query<{
  adjustments: {
    id: string;
    valueInCents: number;
    reason: string;
    type: string;
    attachment: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
  totalPages: number;
  total: number;
}> {
  constructor(
    public readonly page: number,
    public readonly limit: number,
  ) {
    super();
  }
}
