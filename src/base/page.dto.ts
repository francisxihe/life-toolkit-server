import { IsOptional, IsNumber } from "class-validator";

export class PageDto {
  @IsOptional()
  @IsNumber()
  pageNumber?: number;

  @IsOptional()
  @IsNumber()
  pageSize?: number;
}
