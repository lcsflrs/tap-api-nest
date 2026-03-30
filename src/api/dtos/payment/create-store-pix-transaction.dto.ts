import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class CreateStorePixTransactionDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  storeId!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  amountInCents!: number;
}
