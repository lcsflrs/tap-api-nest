import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class CreatePixTransactionDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  amountInCents!: number;
}
