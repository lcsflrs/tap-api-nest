import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class BuyIngressDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  ingressBatchId!: number;
}
