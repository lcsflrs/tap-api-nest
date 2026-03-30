import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateShopDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name!: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  storeId!: number;
}
