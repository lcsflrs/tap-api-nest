import { Command } from "@nestjs/cqrs";

export class SetActualBatchCommand extends Command<{
  actualBatchId: number | undefined;
}> {
  constructor(
    public readonly partyId: number,
    public readonly actualBatchId?: number,
  ) {
    super();
  }
}
