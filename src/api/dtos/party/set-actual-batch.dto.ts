import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class SetActualBatchDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @Min(1)
  actualBatchId?: number;
}
