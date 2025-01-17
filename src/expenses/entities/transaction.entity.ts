import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column('simple-array')
  tags: string[];

  @Column()
  date: Date;

  @Column('json', { nullable: true })
  recurring: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
  };

  @ManyToOne(() => User, user => user.transactions)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}