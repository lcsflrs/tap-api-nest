import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class CreateIngressPixTransactionDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  partyId!: number;
}
