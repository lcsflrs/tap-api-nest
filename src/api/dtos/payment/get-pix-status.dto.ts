import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, IsNotEmpty, Min } from "class-validator";

export class GetPixStatusDto {
  @IsString()
  @IsNotEmpty()
  transactionId!: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  partyId?: number;
}
