import { Type } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Length,
} from "class-validator";
import { IsValidDocument } from "@domain/@shared/decorators/is-valid-document.decorator";
import { BankAccountTypeDto } from "../@shared/ban-account-type.dto";

export class AddBankAccountDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  storeId!: number;

  @IsNumberString()
  @IsNotEmpty()
  bankCode!: string;

  @IsNumberString()
  @IsNotEmpty()
  accountNumber!: string;

  @IsNumberString()
  @IsNotEmpty()
  routingNumber!: string;

  @IsString()
  @IsNotEmpty()
  holderName!: string;

  @IsNumberString()
  @IsNotEmpty()
  @IsValidDocument({
    message: "Invalid document",
  })
  @Length(11, 14)
  document!: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(BankAccountTypeDto)
  type!: BankAccountTypeDto;
}
