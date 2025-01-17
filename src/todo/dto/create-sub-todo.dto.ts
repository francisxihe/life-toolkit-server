import { SubTodo } from "../entities/sub-todo.entity";

export class CreateSubTodoDto {
  name: string;
  description?: string;
  status?: SubTodo["status"];
  tags?: string[];
  importance?: number;
  urgency?: number;
  planTimeRange?: [string, string];
}
