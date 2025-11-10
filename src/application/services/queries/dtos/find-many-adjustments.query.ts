import { Query } from "@nestjs/cqrs";

export class FindManyAdjustmentsQuery extends Query<{
  adjustments: {
    id: string;
    clientId: string;
    valueInCents: number;
    reason: string;
    attachment: string | null;
  }[];
  totalPages: number;
}> {
  constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly clientId?: string,
  ) {
    super();
  }
}
