import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GoogleSignInCommand } from "./dtos/google-sign-in.command";
import type { ICustomerRepository } from "@infrastructure/repositories/interfaces/customer-repository.interface";
import type { IJwtService } from "@infrastructure/adapters/jwt/jwt.interface";
import { Customer } from "@domain/customer/customer.aggregate";
import { CustomerID } from "@domain/customer/customer-id.value";
import { Email } from "@domain/@shared/value-objects/email.value";

@CommandHandler(GoogleSignInCommand)
export class GoogleSignInHandler implements ICommandHandler<GoogleSignInCommand> {
  constructor(
    @Inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository,
    @Inject("JwtService")
    private readonly jwtService: IJwtService,
  ) {}

  async execute(command: GoogleSignInCommand) {
    const { fullName, email } = command;

    let customer = await this.customerRepository.findByEmail(email);

    if (!customer) {
      const newCustomer = Customer.create(
        new CustomerID(0),
        fullName,
        Email.create(email),
      );

      customer = await this.customerRepository.save(newCustomer);
    }

    if (!customer.wallet) {
      customer.registerWallet();
      await this.customerRepository.saveWallet(customer);
    }

    const pendent = customer.getPendentFields();
    const status: "ready" | "pendent" = customer.isProfileComplete()
      ? "ready"
      : "pendent";

    const customerId = customer.getId().getValue();
    const token = await this.jwtService.sign({ user: { id: customerId } });

    const { invitePartyIds, ingressPartyIds, promoterPartyIds } =
      await this.customerRepository.findPendingDataByCustomerId(
        customerId,
        customer.document?.getValue() ?? "",
      );

    return {
      customer: {
        id: customerId,
        name: customer.name,
        email: customer.email.getValue(),
      },
      status,
      pendent,
      token,
      hasCreditCard: !!customer.wallet?.defaultCreditCardId,
      hasIngressForPartiesIds: ingressPartyIds,
      partyPromoterIds: promoterPartyIds,
      wasInvitedToPartiesIds: invitePartyIds,
    };
  }
}
