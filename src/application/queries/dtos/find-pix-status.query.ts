import { Query } from "@nestjs/cqrs";

export class FindPixStatusQuery extends Query<{ pixStatus: string }> {
  constructor(
    public readonly transactionId: string,
    public readonly partyId?: number,
    public readonly customerId?: number,
  ) {
    super();
  }
}
