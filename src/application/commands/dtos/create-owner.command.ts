import { Command } from "@nestjs/cqrs";

export class CreateOwnerCommand extends Command<void> {
  constructor(
    public readonly name: string,
    public readonly lastName: string,
    public readonly document: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly birthdate: Date,
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
