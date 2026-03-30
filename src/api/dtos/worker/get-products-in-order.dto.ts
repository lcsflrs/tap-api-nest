import { IsNotEmpty, IsString } from "class-validator";

export class GetProductsInOrderDto {
  @IsString()
  @IsNotEmpty()
  orderId!: string;
}
