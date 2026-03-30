import { Query } from "@nestjs/cqrs";

export class SearchDocumentDataQuery extends Query<{
  pendentData: string[];
}> {
  constructor(
    public readonly document: string,
    public readonly partyId: number,
  ) {
    super();
  }
}
