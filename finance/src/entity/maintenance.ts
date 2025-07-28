import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('maintenance')
export class Maintenance {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  message: string;

  @Column({ type: 'int', default: 0 })
  @Index()
  position: number;
}
