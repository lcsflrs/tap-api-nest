import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class AssociatePromoterDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  userId!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  partyId!: number;
}
