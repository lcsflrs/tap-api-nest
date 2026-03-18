import { Command } from "@nestjs/cqrs";

export class CreateStorePJCommand extends Command<void> {
  constructor(
    public readonly name: string,
    public readonly ownerDocument: string,
    public readonly statementDescriptor: string,
    public readonly mcc: number,
    public readonly website: string,
    public readonly businessName: string,
    public readonly businessDocument: string,
    public readonly openDate: Date,
    public readonly businessEmail: string,
    public readonly businessPhone: string,
    public readonly address: {
      street: string;
      number: string;
      complement: string;
      neighborhood: string;
      city: string;
      state: string;
      countryCode: string;
      zipCode: string;
    },
  ) {
    super();
  }
}
