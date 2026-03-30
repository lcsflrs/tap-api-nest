import { IsNotEmpty, IsString, Length } from "class-validator";

export class BuyIngressPixDto {
  @IsString()
  @IsNotEmpty()
  @Length(11, 14)
  document!: string;
}
