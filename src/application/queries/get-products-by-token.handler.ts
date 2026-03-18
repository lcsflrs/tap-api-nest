import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  GetProductsByTokenQuery,
  GetProductsByTokenResult,
} from "./dtos/get-products-by-token.query";
import { JwtService } from "@infrastructure/adapters/jwt/jwt.service";
import {
  PaymentTokenSchemaClass,
  PaymentTokenDocument,
} from "@infrastructure/mongodb/schemas/payment-token.schema";

@QueryHandler(GetProductsByTokenQuery)
export class GetProductsByTokenHandler implements IQueryHandler<
  GetProductsByTokenQuery,
  GetProductsByTokenResult
> {
  constructor(
    @InjectModel(PaymentTokenSchemaClass.name)
    private readonly paymentTokenModel: Model<PaymentTokenDocument>,
    @Inject("JwtService")
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    query: GetProductsByTokenQuery,
  ): Promise<GetProductsByTokenResult> {
    const decoded = this.jwtService.decode(query.paymentTokenJwt) as {
      paymentTokenId: string;
      partyId: number;
    };

    if (!decoded?.paymentTokenId) {
      throw new Error("Missing paymentTokenId in JWT");
    }

    if (!decoded?.partyId) {
      throw new Error("Missing partyId in JWT");
    }

    const paymentToken = await this.paymentTokenModel
      .findById(decoded.paymentTokenId)
      .lean();

    if (!paymentToken) {
      throw new Error("Payment token not found");
    }

    return {
      products: paymentToken.products.map((p) => ({
        id: p.code,
        name: p.name,
        priceInCents: p.amount,
        quantity: p.quantity,
      })),
    };
  }
}
