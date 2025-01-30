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
  IsNull,
  Like,
} from "typeorm";
import { Todo } from "./entities/todo.entity";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { SubTodo } from "./entities/sub-todo.entity";
import { BaseService } from "../../base/base.service";
import { TodoPageFilterDto } from "./dto/todo-page-filter.dto";
import { TodoStatus } from "./entities/todo.entity";

function getWhere(filter: TodoPageFilterDto) {
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

  return where;
}

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
      status: createTodoDto.status || TodoStatus.TODO,
      tags: createTodoDto.tags || [],
    });
    return this.todoRepository.save(todo);
  }

  async findAll(
    filter: TodoPageFilterDto & { id?: FindOperator<string> }
  ): Promise<Todo[]> {
    const where = getWhere(filter);

    const todoList = await this.todoRepository.find({
      order: { createdAt: "DESC" },
      where,
    });
    return todoList;
  }

  async page(filter: TodoPageFilterDto): Promise<{
    records: Todo[];
    total: number;
    pageNum: number;
    pageSize: number;
  }> {
    if (!filter.pageNum) {
      filter.pageNum = 1;
    }
    if (!filter.pageSize) {
      filter.pageSize = 10;
    }
    const where = getWhere(filter);
    const [todoList, total] = await this.todoRepository.findAndCount({
      where,
      skip: (filter.pageNum - 1) * filter.pageSize,
      take: filter.pageSize,
    });
    return {
      records: todoList,
      total,
      pageNum: filter.pageNum,
      pageSize: filter.pageSize,
    };
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findById(id);
    Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(todo);
  }

  async todoWithSub(id: string): Promise<Todo> {
    const todo = await this.findById(id);

    // 递归获取子待办
    const recursiveGetSub = async (todoId: string) => {
      const subTodoList: SubTodo[] = await this.subTodoRepository.find({
        where: { parentId: todoId },
      });

      for (let i = 0; i < subTodoList.length; i++) {
        subTodoList[i].subTodoList = await recursiveGetSub(subTodoList[i].id);
      }

      return subTodoList;
    };

    todo.subTodoList = await recursiveGetSub(todo.id);
    return todo;
  }
}
