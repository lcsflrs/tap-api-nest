import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class ModifyProductsAvailableDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  shopId!: number;

  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  productsAvailableId!: number[];
}
