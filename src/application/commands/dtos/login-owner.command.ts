import { Command } from "@nestjs/cqrs";

export class LoginOwnerCommand extends Command<{
  token: string;
  owner: {
    ownerId: number;
    accessId: number;
    isFirstAccess: boolean;
    name: string;
    email: string;
    phone: string;
    birthdate: Date | undefined;
    stores: {
      id: number;
      name: string;
      cnpj: string | null;
      ioSellerId: string | undefined;
    }[];
  };
}> {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {
    super();
  }
}
