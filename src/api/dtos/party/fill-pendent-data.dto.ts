import { IsNotEmpty, IsString } from "class-validator";

export class FillPendentDataDto {
  @IsString()
  @IsNotEmpty()
  document!: string;

  @IsString()
  @IsNotEmpty()
  birthDate!: string;

  @IsString()
  @IsNotEmpty()
  braceletNumber!: string;
}
