import { IsNotEmpty, IsString } from "class-validator";

export class SearchDocumentDataDto {
  @IsString()
  @IsNotEmpty()
  document!: string;
}
