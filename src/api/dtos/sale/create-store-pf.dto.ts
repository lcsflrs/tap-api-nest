import { Type } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import { IsValidCPF } from "@domain/@shared/decorators/is-valid-cpf.decorator";

export class CreateStorePfDto {
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

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumberString()
  @Length(11, 11)
  phone?: string;
}
