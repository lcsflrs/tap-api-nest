import { Type } from "class-transformer";
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import { IsValidCNPJ } from "@domain/@shared/decorators/is-valid-cnpj.decorator";
import { IsValidCPF } from "@domain/@shared/decorators/is-valid-cpf.decorator";

export class CreateStorePjDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  statementDescriptor!: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  mcc!: number;

  @IsNumberString()
  @IsNotEmpty()
  @IsValidCPF({ message: "Invalid CPF" })
  @Length(11, 11)
  ownerDocument!: string;

  @IsEmail()
  @IsNotEmpty()
  businessEmail!: string;

  @IsNumberString()
  @IsNotEmpty()
  @Length(11, 11)
  businessPhone!: string;

  @IsString()
  @IsNotEmpty()
  website!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  businessName!: string;

  @IsNumberString()
  @IsNotEmpty()
  @IsValidCNPJ({ message: "Invalid CNPJ" })
  @Length(14, 14)
  businessDocument!: string;

  @Type(() => Date)
  @IsDateString({ strict: true })
  @IsNotEmpty()
  openDate!: Date;

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
