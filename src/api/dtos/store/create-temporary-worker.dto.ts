import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TemporaryWorkerRoleDto } from "../@shared/temporary-worker-role.dto";

export class CreateTemporaryWorkerDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  shopId!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  expirationHours!: number;

  @IsString()
  @IsEnum(TemporaryWorkerRoleDto, {
    message: "Invalid role",
  })
  role!: TemporaryWorkerRoleDto;
}
