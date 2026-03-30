import { Command } from "@nestjs/cqrs";

export class FillPendentDataCommand extends Command<void> {
  constructor(
    public readonly document: string,
    public readonly partyId: number,
    public readonly braceletNumber: string,
    public readonly birthDate: string,
  ) {
    super();
  }
}
