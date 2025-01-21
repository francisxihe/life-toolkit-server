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
  
  @Controller("subTodo")
  export class SubTodoController {
    constructor(private readonly subTodoService: SubTodoService) {}
  
    /** 创建子待办 */
    @Post("create")
    create(@Body() createSubTodoDto: CreateSubTodoDto) {
      return this.subTodoService.create(createSubTodoDto);
    }
  
    /** 获取子待办列表 */
    @Get("list")
    list() {
      return this.subTodoService.findAll();
    }
  
    /** 获取子待办详情 */
    @Get("detail/:id")
    findById(@Param("id") id: string) {
      return this.subTodoService.findById(id);
    }
  
    /** 更新子待办 */
    @Put("update/:id")
    update(@Param("id") id: string, @Body() updateSubTodoDto: UpdateSubTodoDto) {
      return this.subTodoService.update(id, updateSubTodoDto);
    }
    
    /** 放弃子待办 */
    @Put("abandon/:id")
    abandon(@Param("id") id: string) {
      return this.subTodoService.findAll();
    }
  
    /** 恢复todo */
    @Put("restore/:id")
    restore(@Param("id") id: string) {
      return this.subTodoService.findAll();
    }
  
    /** 删除子待办 */
    @Delete("delete/:id")
    delete(@Param("id") id: string) {
      return this.subTodoService.delete(id);
    }
  
    // getTodoSubTodoIdList
  
    // getSubTodoList
  }
  