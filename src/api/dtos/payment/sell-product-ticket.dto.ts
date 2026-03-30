import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";

export enum PaymentMethodDto {
  CREDIT_CARD = "credit-card",
  DEBIT_CARD = "debit-card",
  PIX = "pix",
  MONEY = "money",
}

export class SellProductTicketProductDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  shopProductId!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity!: number;
}

export class SellProductTicketDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  shopId!: number;

  @IsEnum(PaymentMethodDto)
  paymentMethod!: PaymentMethodDto;

  @IsOptional()
  @IsString()
  braceletNumber?: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SellProductTicketProductDto)
  products!: SellProductTicketProductDto[];

  @Type(() => Number)
  @IsInt()
  @Min(1)
  workerId!: number;
}
