import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { SubTodo } from "./sub-todo.entity";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /** 待办名称 */
  @Column()
  name: string;

  /** 计划待办日期 */
  @Column()
  planDate: string;

  /** 待办状态 */
  @Column()
  status: "todo" | "done" | "abandoned";

  /** 待办描述 */
  @Column("text", { nullable: true })
  description: string;

  /** 计划待办开始时间 */
  @Column({ nullable: true })
  planStartAt: string;

  /** 计划待办结束时间 */
  @Column({ nullable: true })
  planEndAt: string;

  /** 待办标签 */
  @Column("simple-array")
  tags: string[];

  /** 待办重要程度 */
  @Column({ nullable: true })
  importance: number;

  /** 待办紧急程度 */
  @Column({ nullable: true })
  urgency: number;

  /** 待办完成时间 */
  @Column({ nullable: true })
  doneAt: Date;

  /** 放弃待办时间 */
  @Column({ nullable: true })
  abandonedAt: Date;

  /** 待办是否是重复待办 */
  @Column({ nullable: true })
  recurring: string;

  /** 待办重复间隔 */
  @Column({ nullable: true })
  recurrenceInterval: string;

  /** 待办创建时间 */
  @CreateDateColumn()
  createdAt: Date;

  /** 待办更新时间 */
  @UpdateDateColumn()
  updatedAt: Date;

  /** 子待办列表 */
  @OneToMany(() => SubTodo, (subTodo: SubTodo) => subTodo.parentId)
  subTodoList: SubTodo[];
}
