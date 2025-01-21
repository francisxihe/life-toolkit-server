import { Entity, Column } from "typeorm";
import { BaseTodoEntity } from "./base.entity";

@Entity("todo")
export class Todo extends BaseTodoEntity {
  /** 计划待办日期 */
  @Column({ type: 'timestamp' })
  planDate: Date;

  /** 待办是否是重复待办 */
  @Column({ nullable: true })
  recurring: string;

  /** 待办重复间隔 */
  @Column({ nullable: true })
  recurrenceInterval: string;
}
