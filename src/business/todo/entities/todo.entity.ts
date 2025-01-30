import { Entity, Column, OneToMany } from "typeorm";
import { BaseTodoEntity } from "./base.entity";
import { SubTodo } from "./sub-todo.entity";
import { ApiProperty } from '@nestjs/swagger';

export enum TodoStatus {
  TODO = 'todo',
  DONE = 'done',
  ABANDONED = 'abandoned'
}

export enum TodoRepeat {
  NONE = 'none',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly'
}

@Entity("todo")
export class Todo extends BaseTodoEntity {
  /** 计划待办日期 */
  @Column("date")
  planDate: Date;

  @ApiProperty({ 
    description: '待办事项状态',
    enum: TodoStatus,
    enumName: 'TodoStatus',
    default: TodoStatus.TODO
  })
  @Column({ nullable: true })
  status: TodoStatus;

  @ApiProperty({ 
    description: '重复类型',
    enum: TodoRepeat,
    enumName: 'TodoRepeat',
    default: TodoRepeat.NONE
  })
  @Column({ nullable: true })
  repeat: TodoRepeat;

  /** 待办重复间隔 */
  @Column({ nullable: true })
  repeatInterval: string;

  /** 子待办 */
  @OneToMany(() => SubTodo, (subTodo) => subTodo.parentId)
  subTodoList?: SubTodo[];
}
