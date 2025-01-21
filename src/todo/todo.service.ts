import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Todo } from "./entities/todo.entity";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { SubTodo } from "./entities/sub-todo.entity";
import { CreateSubTodoDto } from "./dto/create-sub-todo.dto";
import { UpdateSubTodoDto } from "./dto/update-sub-todo.dto";
import { BaseService } from "../base/base.service";

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

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find({
      order: { createdAt: "DESC" },
    });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findById(id);
    Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(todo);
  }

  async toggleComplete(id: string): Promise<Todo> {
    const todo = await this.findById(id);
    todo.status = todo.status === "todo" ? "done" : "todo";
    return this.todoRepository.save(todo);
  }
}
