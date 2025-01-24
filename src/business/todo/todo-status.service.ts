import { Injectable } from "@nestjs/common";
import { Repository, In } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "./entities/todo.entity";
import { SubTodo } from "./entities/sub-todo.entity";
import { TodoService } from "./todo.service";

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
      todo.status = "done";
      todo.doneAt = new Date();
    });
    await this.todoRepository.save(todoList);
    return todoList;
  }

  async abandon(id: string): Promise<Todo> {
    const todo = await this.findById(id);
    todo.status = "abandoned";
    todo.abandonedAt = new Date();
    await this.todoRepository.save(todo);
    return todo;
  }

  async restore(id: string): Promise<Todo> {
    const todo = await this.findById(id);
    todo.status = "todo";
    todo.doneAt = null;
    todo.abandonedAt = null;
    await this.todoRepository.save(todo);
    return todo;
  }
}
