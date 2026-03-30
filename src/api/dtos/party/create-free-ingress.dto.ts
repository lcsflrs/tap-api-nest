import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class CreateFreeIngressDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  customerId!: number;
}
