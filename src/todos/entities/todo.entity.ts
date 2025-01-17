import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  task: string;

  @Column("text", { nullable: true })
  description: string;

  @Column("simple-array")
  tags: string[];

  @Column()
  importance: string;

  @Column()
  urgency: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ default: false })
  completed: boolean;

  @Column({ nullable: true })
  completedAt: Date | null;

  @Column({ nullable: true })
  recurrence: string;

  @Column({ nullable: true })
  recurrenceInterval: number;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
