import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { LoginOwnerCommand } from "./dtos/login-owner.command";
import type { IAccessUserRepository } from "@infrastructure/repositories/interfaces/access-user-repository.interface";
import type { IOwnerRepository } from "@infrastructure/repositories/interfaces/owner-repository.interface";
import type { IHashAdapter } from "@infrastructure/adapters/bcrypt/hash-adapter.interface";
import type { IJwtService } from "@infrastructure/adapters/jwt/jwt.interface";

@CommandHandler(LoginOwnerCommand)
export class LoginOwnerHandler implements ICommandHandler<LoginOwnerCommand> {
  constructor(
    @Inject("AccessUserRepository")
    private readonly accessUserRepository: IAccessUserRepository,
    @Inject("OwnerRepository")
    private readonly ownerRepository: IOwnerRepository,
    @Inject("HashAdapter")
    private readonly hashAdapter: IHashAdapter,
    @Inject("JwtService")
    private readonly jwtService: IJwtService,
  ) {}

  async execute(command: LoginOwnerCommand) {
    const { email, password } = command;

    const accessUser = await this.accessUserRepository.findByEmail(email);

    if (!accessUser) {
      throw new Error("Invalid credentials");
    }

    const passwordMatches = await this.hashAdapter.compare(
      password,
      accessUser.password,
    );

    if (!passwordMatches) {
      throw new Error("Invalid credentials");
    }

    const owner = await this.ownerRepository.findByAccessUserIdWithStores(
      accessUser.getId().getValue(),
    );

    if (!owner) {
      throw new Error("Invalid credentials");
    }

    const token = await this.jwtService.sign({
      ownerId: owner.getId().getValue(),
      accessUserId: accessUser.getId().getValue(),
      storesId: owner.stores.map((store) => store.storeId.getValue()),
    });

    return {
      token,
      owner: {
        ownerId: owner.getId().getValue(),
        accessId: accessUser.getId().getValue(),
        isFirstAccess: accessUser.isFirstAccess,
        name: owner.name,
        email: owner.email.getValue(),
        phone: owner.phone.getValue(),
        birthdate: owner.birthdate,
        stores: owner.stores.map((store) => ({
          id: store.storeId.getValue(),
          name: store.name,
          cnpj: store.businessDocument?.getValue() ?? null,
          ioSellerId: store.paymentData?.ioSellerId,
        })),
      },
    };
  }
}
