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
import { TodoStatusService } from "./todo-status.service";
import { ApiTags, ApiOperation, ApiParam, ApiBody } from "@nestjs/swagger";

@ApiTags('待办事项')
@Controller("todo")
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly todoStatusService: TodoStatusService
  ) {}

  @ApiOperation({ summary: '批量完成待办事项' })
  @ApiBody({ 
    description: '待办事项ID列表',
    type: [String]
  })
  @Put("batch-done")
  @Response()
  batchDone(@Body() idList: string[]) {
    return this.todoStatusService.batchDone(idList);
  }

  @ApiOperation({ summary: '放弃待办事项' })
  @ApiParam({ name: 'id', description: '待办事项ID' })
  @Put("abandon/:id")
  @Response()
  abandon(@Param("id") id: string) {
    return this.todoStatusService.abandon(id);
  }

  @ApiOperation({ summary: '恢复待办事项' })
  @ApiParam({ name: 'id', description: '待办事项ID' })
  @Put("restore/:id")
  @Response()
  restore(@Param("id") id: string) {
    return this.todoStatusService.restore(id);
  }

  @ApiOperation({ summary: '获取待办事项及其子待办事项' })
  @ApiParam({ name: 'id', description: '待办事项ID' })
  @Get("todo-with-sub/:id")
  @Response()
  todoWithSub(@Param("id") id: string) {
    return this.todoService.todoWithSub(id);
  }

  // getTodoSubTodoIdList

  // getSubTodoList

  @ApiOperation({ summary: '创建待办事项' })
  @ApiBody({ type: CreateTodoDto })
  @Post("create")
  @Response()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @ApiOperation({ summary: '删除待办事项' })
  @ApiParam({ name: 'id', description: '待办事项ID' })
  @Delete("delete/:id")
  @Response()
  delete(@Param("id") id: string) {
    return this.todoService.delete(id);
  }

  @ApiOperation({ summary: '更新待办事项' })
  @ApiParam({ name: 'id', description: '待办事项ID' })
  @ApiBody({ type: UpdateTodoDto })
  @Put("update/:id")
  @Response()
  update(@Param("id") id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @ApiOperation({ summary: '分页获取待办事项列表' })
  @Get("page")
  @Response()
  page(@Query() filter: TodoPageFilterDto) {
    return this.todoService.page(filter);
  }

  @ApiOperation({ summary: '获取待办事项列表' })
  @Get("list")
  @Response()
  list(@Query() filter: TodoListFilterDto) {
    return this.todoService.findAll(filter);
  }

  @ApiOperation({ summary: '获取待办事项详情' })
  @ApiParam({ name: 'id', description: '待办事项ID' })
  @Get("detail/:id")
  @Response()
  findById(@Param("id") id: string) {
    return this.todoService.findById(id);
  }
}
