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
import { TodoPageFilterDto } from "./dto/todo-page-filter.dto";
import { TodoListFilterDto } from "./dto/todo-list-filter.dto";
import { Response } from "@/decorators/response.decorator";

@Controller("todo")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /** 创建todo */
  @Post("create")
  @Response()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  /** 获取todo列表 */
  @Get("page")
  @Response()
  page(@Query() filter: TodoPageFilterDto) {
    return this.todoService.page(filter);
  }

  /** 获取todo列表 */
  @Get("list")
  @Response()
  list(@Query() filter: TodoListFilterDto) {
    return this.todoService.findAll(filter);
  }

  /** 获取todo详情 */
  @Get("detail/:id")
  @Response()
  findById(@Param("id") id: string) {
    return this.todoService.findById(id);
  }

  /** 更新todo */
  @Put("update/:id")
  @Response()
  update(@Param("id") id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  /** 批量完成todo */
  @Put("batchDone")
  @Response()
  batchDone(@Body() idList: string[]) {
    return this.todoService.batchDone(idList);
  }

  /** 放弃todo */
  @Put("abandon/:id")
  @Response()
  abandon(@Param("id") id: string) {
    return this.todoService.abandon(id);
  }

  /** 恢复todo */
  @Put("restore/:id")
  @Response()
  restore(@Param("id") id: string) {
    return this.todoService.restore(id);
  }

  /** 删除todo */
  @Delete("delete/:id")
  @Response()
  delete(@Param("id") id: string) {
    return this.todoService.delete(id);
  }

  /** 获取todo树 */
  @Get("tree")
  @Response()
  todoTree() {
    // return this.todoService.findAll();
  }

  /** 获取todo及其子todo */
  @Get("node/:id")
  @Response()
  todoWithSub(@Param("id") id: string) {
    return this.todoService.findById(id);
  }

  // getTodoSubTodoIdList

  // getSubTodoList
}
