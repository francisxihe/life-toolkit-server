import { Injectable } from "@nestjs/common";
import { Repository, In } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "./entities/todo.entity";
import { SubTodo } from "./entities/sub-todo.entity";
import { TodoService } from "./todo.service";
import { TodoStatus } from "./entities/todo.entity";
@Injectable()
export class TodoStatusService extends TodoService {
  constructor(
    @InjectRepository(Todo)
    todoRepository: Repository<Todo>,
    @InjectRepository(SubTodo)
    subTodoRepository: Repository<SubTodo>
  ) {
    super(todoRepository, subTodoRepository);
  }

  async batchDone(idList: string[]): Promise<Todo[]> {
    const todoList = await this.findAll({
      id: In(idList),
    });
    todoList.forEach((todo) => {
      todo.status = TodoStatus.DONE;
      todo.doneAt = new Date();
    });
    await this.todoRepository.save(todoList);
    return todoList;
  }

  async abandon(id: string): Promise<Todo> {
    const todo = await this.findById(id);
    todo.status = TodoStatus.ABANDONED;
    todo.abandonedAt = new Date();
    await this.todoRepository.save(todo);
    return todo;
  }

  async restore(id: string): Promise<Todo> {
    const todo = await this.findById(id);
    todo.status = TodoStatus.TODO;
    todo.doneAt = null;
    todo.abandonedAt = null;
    await this.todoRepository.save(todo);
    return todo;
  }
}
