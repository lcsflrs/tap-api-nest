import { Type } from "class-transformer";
import { IsArray, IsInt, Min } from "class-validator";

export class SetPartyProductsDto {
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Type(() => Number)
  productsAvailableId!: number[];
}
