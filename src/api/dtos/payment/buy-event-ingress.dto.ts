import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class BuyEventIngressDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  ingressBatchId!: number;
}
