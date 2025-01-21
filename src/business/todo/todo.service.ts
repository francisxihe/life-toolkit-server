import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In, FindOperator } from "typeorm";
import { Todo } from "./entities/todo.entity";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { SubTodo } from "./entities/sub-todo.entity";
import { BaseService } from "../../base/base.service";
import { TodoPageFilterDto } from "./dto/todo-page-filter.dto";
import { ResponseDto, PaginationResponseDto } from "../../helpers/response";

@Injectable()
export class TodoService extends BaseService<Todo> {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    @InjectRepository(SubTodo)
    private subTodoRepository: Repository<SubTodo>
  ) {
    super(todoRepository);
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create({
      ...createTodoDto,
      status: createTodoDto.status || "todo",
      tags: createTodoDto.tags || [],
    });
    return this.todoRepository.save(todo);
  }

  async findAll(
    filter: TodoPageFilterDto & { id?: FindOperator<string> }
  ): Promise<Todo[]> {
    return this.todoRepository.find({
      order: { createdAt: "DESC" },
      where: filter,
    });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findById(id);
    Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(todo);
  }

  async batchDone(idList: string[]): Promise<ResponseDto<Todo[]>> {
    const todoList = await this.findAll({
      id: In(idList),
    });
    todoList.forEach((todo) => {
      todo.status = "done";
      todo.doneAt = new Date();
    });
    await this.todoRepository.save(todoList);
    return ResponseDto.success({
      message: "批量完成成功",
      data: todoList,
    });
  }

  async abandon(id: string): Promise<ResponseDto<Todo>> {
    const todo = await this.findById(id);
    todo.status = "abandoned";
    await this.todoRepository.save(todo);
    return ResponseDto.success({
      message: "放弃成功",
      data: todo,
    });
  }

  async restore(id: string): Promise<ResponseDto<Todo>> {
    const todo = await this.findById(id);
    todo.status = "todo";
    todo.doneAt = null;
    todo.abandonedAt = null;
    await this.todoRepository.save(todo);
    return ResponseDto.success({
      message: "恢复成功",
      data: todo,
    });
  }
}
