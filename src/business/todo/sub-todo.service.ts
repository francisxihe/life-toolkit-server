import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SubTodo } from "./entities/sub-todo.entity";
import { CreateSubTodoDto } from "./dto/create-sub-todo.dto";
import { UpdateSubTodoDto } from "./dto/update-sub-todo.dto";
import { BaseService } from "../../base/base.service";

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

  async findSubTodo(id: string): Promise<SubTodo> {
    const subTodo = await this.findById(id);
    if (!subTodo) {
      throw new NotFoundException(`SubTodo #${id} not found`);
    }
    return subTodo;
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

  async subTodoWithSub(id: string): Promise<SubTodo> {
    const subTodo = await this.findById(id);

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

    subTodo.subTodoList = await recursiveGetSub(subTodo.id);
    return subTodo;
  }
}
