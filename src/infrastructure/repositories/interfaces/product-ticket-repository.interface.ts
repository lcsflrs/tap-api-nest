import { ProductTicket } from "@domain/product-ticket/product-ticket.aggregate";

export interface IProductTicketRepository {
  save(ticket: ProductTicket): Promise<void>;
}
