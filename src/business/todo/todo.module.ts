import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { Todo } from "./entities/todo.entity";
import { SubTodo } from "./entities/sub-todo.entity";
import { SubTodoController } from "./sub-todo.controller";
import { SubTodoService } from "./sub-todo.service";

@Module({
  imports: [TypeOrmModule.forFeature([Todo, SubTodo])],
  controllers: [TodoController, SubTodoController],
  providers: [TodoService, SubTodoService],
  exports: [TodoService, SubTodoService],
})
export class TodoModule {}
