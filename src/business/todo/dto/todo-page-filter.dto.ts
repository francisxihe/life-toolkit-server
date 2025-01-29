import { Todo } from "../entities/todo.entity";
import {
  IsOptional,
  IsString,
  IsDateString,
  IsNumber,
  IsEnum,
} from "class-validator";
import { PageDto } from "@/base/page.dto";

export class TodoPageFilterDto extends PageDto {
  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsDateString()
  planDateStart?: string;

  @IsOptional()
  @IsDateString()
  planDateEnd?: string;

  @IsOptional()
  @IsNumber()
  importance?: number;

  @IsOptional()
  @IsNumber()
  urgency?: number;

  @IsOptional()
  @IsEnum({ todo: "todo", done: "done", abandoned: "abandoned" })
  status?: Todo["status"];

  @IsOptional()
  @IsDateString()
  doneDateStart?: string;

  @IsOptional()
  @IsDateString()
  doneDateEnd?: string;

  @IsOptional()
  @IsDateString()
  abandonedDateStart?: string;

  @IsOptional()
  @IsDateString()
  abandonedDateEnd?: string;

  @IsOptional()
  @IsNumber()
  pageNum?: number | undefined;

  @IsOptional()
  @IsNumber()
  pageSize?: number | undefined;
}
