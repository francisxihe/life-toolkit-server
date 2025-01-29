import { SubTodo } from "../entities/sub-todo.entity";
import { IsString, IsOptional, IsEnum, IsArray, IsNumber, IsISO8601 } from "class-validator";

export class CreateSubTodoDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum({ todo: "todo", done: "done", abandoned: "abandoned" })
  @IsOptional()
  status?: SubTodo["status"];

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

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  planTimeRange?: [string, string];

  @IsString()
  parentId: string;
}
