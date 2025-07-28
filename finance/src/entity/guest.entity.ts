import { Entity, BeforeInsert, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('guest')
export class Guest {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({
    name: 'username',
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
  })
  userName: string;

  @BeforeInsert()
  async setUserName() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.userName = Array.from({ length: 10 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length)),
    ).join('');
  }
}
