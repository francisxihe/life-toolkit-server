import { Column } from "typeorm";
import { BaseEntity } from "@/base/base.entity";

export class BaseTodoEntity extends BaseEntity {
  /** 待办名称 */
  @Column()
  name: string;

  /** 待办状态 */
  @Column()
  status: "todo" | "done" | "abandoned";

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
  @Column("datetime", {
    nullable: true,
  })
  doneAt: Date | null;

  /** 放弃待办时间 */
  @Column("datetime", {
    nullable: true,
  })
  abandonedAt: Date | null;

  /** 计划待办开始时间 */
  @Column("time", { nullable: true })
  planStartAt?: string;
  
  /** 计划待办结束时间 */
  @Column("time", { nullable: true })
  planEndAt?: string;
}
