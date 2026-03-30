import { Command } from "@nestjs/cqrs";

export class CreateTemporaryWorkerCommand extends Command<{
  workerId: number;
  shopId: number;
  name: string | null;
  expirationHours: number;
  expirationDate: Date | null;
  accessJwt: string;
  role: string;
}> {
  constructor(
    public readonly shopId: number,
    public readonly name: string,
    public readonly expirationHours: number,
    public readonly role: string,
  ) {
    super();
  }
}
