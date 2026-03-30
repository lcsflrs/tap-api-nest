import { IsNotEmpty, IsString } from "class-validator";

export class RegisterPendentDataDto {
  @IsString()
  @IsNotEmpty()
  document!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;
}
