import { IsNotEmpty, IsString } from "class-validator";

export class ReadQrCodeDto {
  @IsString()
  @IsNotEmpty()
  paymentTokenJwt!: string;
}
