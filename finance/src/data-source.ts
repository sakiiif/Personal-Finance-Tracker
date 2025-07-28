import { DataSource } from 'typeorm';
import { Feedback } from 'src/entity/feedback.entity';
import { User } from 'src/entity/user.entity';
import { Expense } from 'src/entity/expense.entity';
import { Guest } from 'src/entity/guest.entity';
import { Admin } from 'src/entity/admin.entity';
import { Maintenance } from './entity/maintenance';

//import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const config = new DataSource({
  type: 'postgres',
  database: 'dev',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345',
  entities: [User, Expense, Feedback, Guest, Admin, Maintenance], // Path to your entities
  //migrations: ['E:/finance/src/migrations/*.{ts,js}'], // Path to your migrations
  synchronize: true, // Set to true only for development
});

export default config;
