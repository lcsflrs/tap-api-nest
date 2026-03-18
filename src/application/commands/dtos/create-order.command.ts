import { Command } from "@nestjs/cqrs";

export class CreateOrderCommand extends Command<{
  orderId: string;
  jwtToken: string;
}> {
  constructor(
    public readonly customerId: number,
    public readonly shopId: number,
    public readonly installments: number,
    public readonly orderItems: {
      shopProductId: number;
      quantity: number;
    }[],
  ) {
    super();
  }
}
