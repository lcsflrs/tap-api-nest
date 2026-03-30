import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class GetAllTransfersDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  storeId!: number;
}
