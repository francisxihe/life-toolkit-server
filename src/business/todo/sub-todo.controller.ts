import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { SubTodoService } from "./sub-todo.service";
import { CreateSubTodoDto } from "./dto/create-sub-todo.dto";
import { UpdateSubTodoDto } from "./dto/update-sub-todo.dto";
import { TodoStatusService } from "./todo-status.service";
import { Response } from "@/decorators/response.decorator";

@Controller("sub-todo")
export class SubTodoController {
  constructor(
    private readonly subTodoService: SubTodoService,
    private readonly todoStatusService: TodoStatusService
  ) {}


  /** 获取子待办及其子待办 */
  @Get("sub-todo-with-sub/:id")
  @Response()
  subTodoWithSub(@Param("id") id: string) {
    return this.subTodoService.subTodoWithSub(id);
  }

  /** 放弃子待办 */
  @Put("abandon/:id")
  @Response()
  abandon(@Param("id") id: string) {
    return this.todoStatusService.abandon(id);
  }

  /** 恢复todo */
  @Put("restore/:id")
  @Response()
  restore(@Param("id") id: string) {
    return this.todoStatusService.restore(id);
  }

  // getTodoSubTodoIdList

  // getSubTodoList

  /** 创建子待办 */
  @Post("create")
  @Response()
  create(@Body() createSubTodoDto: CreateSubTodoDto) {
    return this.subTodoService.create(createSubTodoDto);
  }

  /** 删除子待办 */
  @Delete("delete/:id")
  @Response()
  delete(@Param("id") id: string) {
    return this.subTodoService.delete(id);
  }

  /** 更新子待办 */
  @Put("update/:id")
  @Response()
  update(@Param("id") id: string, @Body() updateSubTodoDto: UpdateSubTodoDto) {
    return this.subTodoService.update(id, updateSubTodoDto);
  }

  /** 获取子待办列表 */
  @Get("list")
  @Response()
  list() {
    return this.subTodoService.findAll();
  }

  /** 获取子待办详情 */
  @Get("detail/:id")
  @Response()
  findById(@Param("id") id: string) {
    return this.subTodoService.findById(id);
  }
}
