import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { SellProductTicketCommand } from "./dtos/sell-product-ticket.command";
import type { IProductTicketRepository } from "@infrastructure/repositories/interfaces/product-ticket-repository.interface";
import { ProductTicket } from "@domain/product-ticket/product-ticket.aggregate";

@CommandHandler(SellProductTicketCommand)
export class SellProductTicketHandler implements ICommandHandler<SellProductTicketCommand> {
  constructor(
    @Inject("ProductTicketRepository")
    private readonly productTicketRepository: IProductTicketRepository,
  ) {}

  async execute(command: SellProductTicketCommand): Promise<void> {
    const ticket = ProductTicket.create(
      command.workerId,
      command.paymentMethod,
      command.products,
    );

    await this.productTicketRepository.save(ticket);
  }
}
