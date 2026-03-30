import { IsNotEmpty, IsString } from "class-validator";

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  accessUserId!: string;

  @IsString()
  @IsNotEmpty()
  newPassword!: string;
}
