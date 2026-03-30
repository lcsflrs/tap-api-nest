import { IsNotEmpty, IsString } from "class-validator";

export class GetProductsByTokenDto {
  @IsString()
  @IsNotEmpty()
  paymentTokenJwt!: string;
}
