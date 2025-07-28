import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('admin')
export class Admin {
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
}
