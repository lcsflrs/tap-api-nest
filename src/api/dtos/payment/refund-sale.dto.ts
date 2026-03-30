import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class RefundSaleDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  saleId!: number;
}
