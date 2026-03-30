import { IsNotEmpty, IsString } from "class-validator";

export class AddCreditCardDto {
  @IsString()
  @IsNotEmpty()
  first4_digits!: string;

  @IsString()
  @IsNotEmpty()
  last4_digits!: string;

  @IsString()
  @IsNotEmpty()
  expiration_month!: string;

  @IsString()
  @IsNotEmpty()
  expiration_year!: string;

  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  token!: string;

  @IsString()
  @IsNotEmpty()
  card_brand!: string;

  @IsString()
  @IsNotEmpty()
  holder_name!: string;
}
