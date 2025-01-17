import { Todo } from "../entities/todo.entity";

export class CreateTodoDto {
  name: string;
  description?: string;
  status?: Todo["status"];
  tags?: string[];
  importance?: number;
  urgency?: number;
  planDate: string;
  planTimeRange?: [string, string];
  recurring?: Todo["recurring"];
}
