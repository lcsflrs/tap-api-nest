import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import type { IProductTicketRepository } from "./interfaces/product-ticket-repository.interface";
import { ProductTicket } from "@domain/product-ticket/product-ticket.aggregate";
import {
  ProductTicketSchemaClass,
  ProductTicketDocument,
} from "@infrastructure/mongodb/schemas/product-ticket.schema";

@Injectable()
export class ProductTicketRepository implements IProductTicketRepository {
  constructor(
    @InjectModel(ProductTicketSchemaClass.name)
    private readonly model: Model<ProductTicketDocument>,
  ) {}

  async save(ticket: ProductTicket): Promise<void> {
    await this.model.create({
      workerId: ticket.workerId,
      paymentMethod: ticket.paymentMethod,
      products: ticket.products,
    });
  }
}
