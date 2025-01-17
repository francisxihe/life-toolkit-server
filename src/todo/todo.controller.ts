import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get('list')
  findAll() {
    return this.todoService.findAll();
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
} 