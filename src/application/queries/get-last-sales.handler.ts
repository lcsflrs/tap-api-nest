import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GetLastSalesQuery } from "./dtos/get-last-sales.query";
import {
  PaymentTokenSchemaClass,
  PaymentTokenDocument,
} from "@infrastructure/mongodb/schemas/payment-token.schema";

@QueryHandler(GetLastSalesQuery)
export class GetLastSalesHandler implements IQueryHandler<GetLastSalesQuery> {
  constructor(
    @InjectModel(PaymentTokenSchemaClass.name)
    private readonly paymentTokenModel: Model<PaymentTokenDocument>,
  ) {}

  async execute(query: GetLastSalesQuery) {
    const { partyId } = query;

    const tokens = await this.paymentTokenModel
      .find({ partyId, paymentStatus: "paid" })
      .sort({ createdAt: -1 })
      .exec();

    return {
      paymentTokens: tokens.map((token) => ({
        id: token._id.toString(),
        transactionId: token.transactionId,
        paymentStatus: token.paymentStatus,
        amountInCents: token.amount,
        payedAt: token.payedAt,
        products: token.products.map((p) => ({
          name: p.name,
          id: Number(p.code),
          quantity: p.quantity,
        })),
      })),
    };
  }
}
