import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'feedback', type: 'varchar', length: 150, nullable: false })
  feedback: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  datePosted: Date;
}
