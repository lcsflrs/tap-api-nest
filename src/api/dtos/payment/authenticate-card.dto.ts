import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class AuthenticateCardDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  creditCardId!: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  centsAmount!: number;
}
