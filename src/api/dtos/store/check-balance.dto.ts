import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CheckBalanceDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  storeId!: number;
}
