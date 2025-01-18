import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Todo } from "./todo.entity";

@Entity()
export class SubTodo {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  /** 待办名称 */
  @Column()
  name: string;
  /** 待办描述 */
  @Column({ nullable: true })
  description?: string;
  /** 待办重要程度 */
  @Column({ nullable: true })
  importance?: number;
  /** 待办紧急程度 */
  @Column({ nullable: true })
  urgency?: number;
  /** 待办标签 */
  @Column("simple-array")
  tags: string[];
  /** 待办完成时间 */
  @Column({ nullable: true })
  doneAt?: string;
  /** 计划待办开始时间 */
  @Column({ nullable: true })
  planStartAt?: string;
  /** 计划待办结束时间 */
  @Column({ nullable: true })
  planEndAt?: string;
  /** 待办创建时间 */
  @CreateDateColumn()
  createdAt: Date;
  /** 放弃待办时间 */
  @Column({ nullable: true })
  abandonedAt?: string;
  /** 待办状态 */
  @Column()
  status: "todo" | "done" | "abandoned";
  /** 父待办id */
  @Column()
  parentId: string;
}
