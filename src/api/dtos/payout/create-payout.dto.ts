import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  Min,
} from "class-validator";

export class CreatePayoutDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  shopId!: number;

  @IsString()
  @IsNotEmpty()
  shopName!: string;

  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  @IsInt({ each: true })
  @Min(1, { each: true })
  storeSaleIds!: number[];

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  proofFileUrl!: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  date!: string;
}
