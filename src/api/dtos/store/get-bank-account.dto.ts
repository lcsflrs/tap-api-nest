import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class GetBankAccountDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  storeId!: number;
}
