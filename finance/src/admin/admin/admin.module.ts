import { forwardRef, Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entity/admin.entity';
import { User } from 'src/entity/user.entity';
import { UserModule } from 'src/user/user/user.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, User]),
    forwardRef(() => UserModule),
  ],
  controllers: [AdminController],
  exports: [TypeOrmModule, AdminService],
  providers: [AdminService],
})
export class AdminModule {}
