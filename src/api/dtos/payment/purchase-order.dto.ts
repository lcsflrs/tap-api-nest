import { IsNotEmpty, IsString } from "class-validator";

export class PurchaseOrderDto {
  @IsString()
  @IsNotEmpty()
  orderId!: string;
}
