import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";

export enum PayoutStatusDto {
  PENDING = "PENDING",
  PAID = "PAID",
}

export class FindPaidPayoutsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @IsString()
  storeName?: string;

  @IsOptional()
  @IsEnum(PayoutStatusDto)
  status?: PayoutStatusDto;
}
