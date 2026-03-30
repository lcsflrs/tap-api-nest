import { IsNotEmpty, IsString } from "class-validator";

export class CreateInviteDto {
  @IsString()
  @IsNotEmpty()
  document!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;
}
