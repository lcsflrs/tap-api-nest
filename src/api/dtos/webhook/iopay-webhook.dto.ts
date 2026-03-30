import { IsNotEmpty, IsString } from "class-validator";

export class IopayWebhookDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsString()
  @IsNotEmpty()
  status!: string;

  @IsString()
  @IsNotEmpty()
  reference_id!: string;

  @IsString()
  @IsNotEmpty()
  io_seller_id!: string;

  @IsString()
  @IsNotEmpty()
  sign_confirm!: string;
}
