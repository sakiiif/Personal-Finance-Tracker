import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
@Entity('expense')
export class Expense {
  @PrimaryGeneratedColumn({ name: 'serial', type: 'int' })
  id: number;
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
  @Column({ name: 'total_expense_goal', type: 'int', default: 0 })
  total_expense_goal: number;
  @Column('jsonb', { nullable: false, default: {} })
  data: Record<string, number>;
}