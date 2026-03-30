import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";

class CreateCashierPaymentTokenProductDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  amount!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity!: number;
}

export class CreateCashierPaymentTokenDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  partyId!: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateCashierPaymentTokenProductDto)
  products!: CreateCashierPaymentTokenProductDto[];

  @Type(() => Number)
  @IsInt()
  @Min(1)
  amount!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  installments!: number;
}
