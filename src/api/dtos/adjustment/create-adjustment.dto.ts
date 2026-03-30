import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from "class-validator";

export enum AdjustmentTypeDto {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}

export class CreateAdjustmentDto {
  @IsInt()
  @Min(1)
  valueInCents!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  reason!: string;

  @IsEnum(AdjustmentTypeDto)
  type!: AdjustmentTypeDto;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  attachment?: string;
}
