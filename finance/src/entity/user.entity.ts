import {
  Entity,
  //BeforeInsert,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from 'typeorm';
//import * as bcrypt from 'bcrypt';
import { Expense } from './expense.entity';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;
  @Column({ name: 'fullname', type: 'varchar', length: 150, nullable: false })
  fullname: string;

  @Column({
    name: 'username',
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({ name: 'email', unique: true, nullable: false })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;
  @Column({
    name: 'role',
    type: 'varchar',
    length: 100,
    nullable: false,
    default: 'user',
  })
  role: string;
  @OneToOne(() => Expense)
  expense: Expense;
}
