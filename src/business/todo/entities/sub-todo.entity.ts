import { Entity, Column, OneToMany } from "typeorm";
import { BaseTodoEntity } from "./base.entity";

@Entity("todo")
export class SubTodo extends BaseTodoEntity {
  /** 子待办 */
  @OneToMany(() => SubTodo, (subTodo) => subTodo.parentId)
  subTodoList: SubTodo[];
}
