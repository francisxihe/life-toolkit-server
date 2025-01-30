import { Todo, TodoStatus } from "../entities/todo.entity";
import {
  IsOptional,
  IsString,
  IsDateString,
  IsNumber,
  IsEnum,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class TodoListFilterDto {
  @ApiProperty({ 
    description: '计划开始日期',
    required: false,
    example: '2024-01-01'
  })
  @IsOptional()
  @IsDateString()
  planDateStart?: string;

  @ApiProperty({ 
    description: '计划结束日期',
    required: false,
    example: '2024-01-31'
  })
  @IsOptional()
  @IsDateString()
  planDateEnd?: string;

  @ApiProperty({ 
    description: '重要程度',
    required: false,
    minimum: 1,
    maximum: 5
  })
  @IsOptional()
  @IsNumber()
  importance?: number;

  @ApiProperty({ 
    description: '紧急程度',
    required: false,
    minimum: 1,
    maximum: 5
  })
  @IsOptional()
  @IsNumber()
  urgency?: number;

  @ApiProperty({ 
    description: '状态',
    enum: TodoStatus,
    enumName: 'TodoStatus',
    required: false
  })
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;

  @ApiProperty({ 
    description: '完成开始日期',
    required: false,
    example: '2024-01-01'
  })
  @IsOptional()
  @IsDateString()
  doneDateStart?: string;

  @ApiProperty({ 
    description: '完成结束日期',
    required: false,
    example: '2024-01-31'
  })
  @IsOptional()
  @IsDateString()
  doneDateEnd?: string;

  @ApiProperty({ 
    description: '放弃开始日期',
    required: false,
    example: '2024-01-01'
  })
  @IsOptional()
  @IsDateString()
  abandonedDateStart?: string;

  @ApiProperty({ 
    description: '放弃结束日期',
    required: false,
    example: '2024-01-31'
  })
  @IsOptional()
  @IsDateString()
  abandonedDateEnd?: string;
}
