import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class GoogleSignInDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
