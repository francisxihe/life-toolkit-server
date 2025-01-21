import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { CreateSubTodoDto } from "./dto/create-sub-todo.dto";
import { TodoPageFilterDto } from "./dto/todo-page-filter.dto";

@Controller("todo")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /** 创建todo */
  @Post("create")
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  /** 获取todo列表 */
  @Get("list")
  list(@Query() filter: TodoPageFilterDto) {
    return this.todoService.findAll(filter);
  }

  /** 获取todo详情 */
  @Get("detail/:id")
  findById(@Param("id") id: string) {
    return this.todoService.findById(id);
  }

  /** 更新todo */
  @Put("update/:id")
  update(@Param("id") id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  /** 批量完成todo */
  @Put("batchDone")
  batchDone(@Body() idList: string[]) {
    return this.todoService.batchDone(idList);
  }

  /** 放弃todo */
  @Put("abandon/:id")
  abandon(@Param("id") id: string) {
    return this.todoService.abandon(id);
  }

  /** 恢复todo */
  @Put("restore/:id")
  restore(@Param("id") id: string) {
    return this.todoService.restore(id);
  }

  /** 删除todo */
  @Delete("delete/:id")
  delete(@Param("id") id: string) {
    return this.todoService.delete(id);
  }

  /** 获取todo树 */
  @Get("tree")
  todoTree() {
    // return this.todoService.findAll();
  }

  /** 获取todo及其子todo */
  @Get("node/:id")
  todoWithSub(@Param("id") id: string) {
    return this.todoService.findById(id);
  }

  // getTodoSubTodoIdList

  // getSubTodoList
}
