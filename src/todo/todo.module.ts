import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { Todo } from "./entities/todo.entity";
import { SubTodo } from "./entities/sub-todo.entity";


@Module({
  imports: [TypeOrmModule.forFeature([Todo, SubTodo])],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
