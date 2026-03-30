import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class GetAllBankAccountsDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  storeId!: number;
}
