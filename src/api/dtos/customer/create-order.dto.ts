import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  Min,
  ValidateNested,
} from "class-validator";

export class CreateOrderItemDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  shopProductId!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity!: number;
}

export class CreateOrderDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems!: CreateOrderItemDto[];

  @Type(() => Number)
  @IsInt()
  @Min(1)
  shopId!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  installments!: number;
}
