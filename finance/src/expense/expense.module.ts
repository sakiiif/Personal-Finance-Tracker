import { forwardRef, Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { UserModule } from 'src/user/user/user.module';
//import { UserService } from 'src/user/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from 'src/entity/expense.entity';
import { User } from 'src/entity/user.entity';
//import { AuthModule } from 'src/user/auth/auth.module';
//import { UserModule } from 'src/user/user/user.module';
//import { UserService } from 'src/user/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense, User]),
    forwardRef(() => UserModule),
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
  exports: [TypeOrmModule, ExpenseService],
})
export class ExpenseModule {}
