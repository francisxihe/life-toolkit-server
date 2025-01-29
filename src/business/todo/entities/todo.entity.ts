import { Entity, Column, OneToMany } from "typeorm";
import { BaseTodoEntity } from "./base.entity";
import { SubTodo } from "./sub-todo.entity";

@Entity("todo")
export class Todo extends BaseTodoEntity {
  /** 计划待办日期 */
  @Column("date")
  planDate: Date;

  /** 待办是否是重复待办 */
  @Column({ nullable: true })
  repeat: string;

  /** 待办重复间隔 */
  @Column({ nullable: true })
  repeatInterval: string;

  /** 子待办 */
  @OneToMany(() => SubTodo, (subTodo) => subTodo.parentId)
  subTodoList?: SubTodo[];
}
