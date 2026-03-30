import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTransferDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  storeId!: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  amountInCents!: number;
}
