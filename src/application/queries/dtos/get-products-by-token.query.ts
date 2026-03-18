import { IQuery } from "@nestjs/cqrs";

export interface GetProductsByTokenResult {
  products: {
    id: string;
    name: string;
    priceInCents: number;
    quantity: number;
  }[];
}

export class GetProductsByTokenQuery implements IQuery {
  constructor(public readonly paymentTokenJwt: string) {}
}
