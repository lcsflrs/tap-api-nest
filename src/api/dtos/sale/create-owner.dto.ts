import { Type } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import { IsValidCPF } from "@domain/@shared/decorators/is-valid-cpf.decorator";

export class CreateOwnerDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  lastName!: string;

  @IsNumberString()
  @IsNotEmpty()
  @IsValidCPF({ message: "Invalid CPF" })
  @Length(11, 11)
  document!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNumberString()
  @IsNotEmpty()
  @Length(11, 11)
  phone!: string;

  @Type(() => Date)
  @IsNotEmpty()
  birthdate!: Date;

  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  street!: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  number!: string;

  @IsString()
  @IsOptional()
  @Length(0, 100)
  complement!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 40)
  neighborhood!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 40)
  city!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  state!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  countryCode!: string;

  @IsNumberString()
  @IsNotEmpty()
  @Length(8, 8)
  zipCode!: string;
}
