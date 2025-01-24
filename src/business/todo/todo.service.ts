import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Repository,
  In,
  FindOperator,
  FindOptionsWhere,
  Between,
  MoreThan,
  LessThan,
  Like,
} from "typeorm";
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
    protected todoRepository: Repository<Todo>,
    @InjectRepository(SubTodo)
    protected subTodoRepository: Repository<SubTodo>
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
    const where: FindOptionsWhere<Todo> = {};
    if (filter.planDateStart && filter.planDateEnd) {
      where.planDate = Between(
        new Date(filter.planDateStart + "T00:00:00"),
        new Date(filter.planDateEnd + "T23:59:59")
      );
    } else if (filter.planDateStart) {
      where.planDate = MoreThan(new Date(filter.planDateStart + "T00:00:00"));
    } else if (filter.planDateEnd) {
      where.planDate = LessThan(new Date(filter.planDateEnd + "T23:59:59"));
    }

    if (filter.doneDateStart && filter.doneDateEnd) {
      where.doneAt = Between(
        new Date(filter.doneDateStart + "T00:00:00"),
        new Date(filter.doneDateEnd + "T23:59:59")
      );
    } else if (filter.doneDateStart) {
      where.doneAt = MoreThan(new Date(filter.doneDateStart + "T00:00:00"));
    } else if (filter.doneDateEnd) {
      where.doneAt = LessThan(new Date(filter.doneDateEnd + "T23:59:59"));
    }

    if (filter.abandonedDateStart && filter.abandonedDateEnd) {
      where.abandonedAt = Between(
        new Date(filter.abandonedDateStart + "T00:00:00"),
        new Date(filter.abandonedDateEnd + "T23:59:59")
      );
    } else if (filter.abandonedDateStart) {
      where.abandonedAt = MoreThan(
        new Date(filter.abandonedDateStart + "T00:00:00")
      );
    } else if (filter.abandonedDateEnd) {
      where.abandonedAt = LessThan(
        new Date(filter.abandonedDateEnd + "T23:59:59")
      );
    }

    if (filter.keyword) {
      where.name = Like(`%${filter.keyword}%`);
    }

    if (filter.status) {
      where.status = filter.status;
    }

    if (filter.importance) {
      where.importance = filter.importance;
    }

    if (filter.urgency) {
      where.urgency = filter.urgency;
    }

    const todoList = await this.todoRepository.find({
      order: { createdAt: "DESC" },
      where,
    });

    return todoList;
  }

  async page(filter: TodoPageFilterDto): Promise<{
    data: Todo[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    const where: FindOptionsWhere<Todo> = {};
    const todoList = await this.findAll(filter);
    const total = await this.todoRepository.count({ where });
    return {
      data: todoList,
      total,
      page: 1,
      pageSize: 10,
    };
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findById(id);
    Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(todo);
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
