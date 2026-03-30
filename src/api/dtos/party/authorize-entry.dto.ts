import { IsString, IsInt, IsPositive } from "class-validator";

export class AuthorizeEntryDto {
  @IsString()
  document!: string;

  @IsInt()
  @IsPositive()
  valueInCents!: number;
}
