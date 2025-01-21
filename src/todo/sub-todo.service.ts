import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SubTodo } from "./entities/sub-todo.entity";
import { CreateSubTodoDto } from "./dto/create-sub-todo.dto";
import { UpdateSubTodoDto } from "./dto/update-sub-todo.dto";
import { BaseService } from "../base/base.service";

@Injectable()
export class SubTodoService extends BaseService<SubTodo> {
  constructor(
    @InjectRepository(SubTodo)
    private subTodoRepository: Repository<SubTodo>
  ) {
    super(subTodoRepository);
  }

  async create(createSubTodoDto: CreateSubTodoDto): Promise<SubTodo> {
    const subTodo = this.subTodoRepository.create({
      ...createSubTodoDto,
      status: createSubTodoDto.status || "todo",
      tags: createSubTodoDto.tags || [],
    });
    return this.subTodoRepository.save(subTodo);
  }

  async findAll(): Promise<SubTodo[]> {
    return this.subTodoRepository.find({
      order: { createdAt: "DESC" },
    });
  }

  async update(
    id: string,
    updateSubTodoDto: UpdateSubTodoDto
  ): Promise<SubTodo> {
    const subTodo = await this.findById(id);
    Object.assign(subTodo, updateSubTodoDto);
    return this.subTodoRepository.save(subTodo);
  }

  async toggleComplete(id: string): Promise<SubTodo> {
    const subTodo = await this.findById(id);
    subTodo.status = subTodo.status === "todo" ? "done" : "todo";
    return this.subTodoRepository.save(subTodo);
  }
}
