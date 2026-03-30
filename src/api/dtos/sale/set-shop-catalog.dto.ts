import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from "class-validator";

export class ShopCatalogProductItemDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  productId!: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  priceInCents!: number;
}

export class SetShopCatalogDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ShopCatalogProductItemDto)
  productsList!: ShopCatalogProductItemDto[];

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  shopId!: number;
}
