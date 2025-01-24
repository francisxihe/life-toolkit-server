import { Todo } from "../entities/todo.entity";
import {
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
  IsNumber,
  IsISO8601,
} from "class-validator";

export class CreateTodoDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum({ todo: "todo", done: "done", abandoned: "abandoned" })
  @IsOptional()
  status?: Todo["status"];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsNumber()
  @IsOptional()
  importance?: number;

  @IsNumber()
  @IsOptional()
  urgency?: number;

  @IsISO8601()
  planDate: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  planTimeRange?: [string, string];

  @IsString()
  @IsOptional()
  repeat?: Todo["repeat"];
}
