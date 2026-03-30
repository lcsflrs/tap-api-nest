import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SetDefaultPaymentMethodDto {
  @IsOptional()
  @IsString()
  cardId?: string;

  @IsString()
  @IsNotEmpty()
  paymentMethod!: string;
}
