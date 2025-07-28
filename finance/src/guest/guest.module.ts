import { Module } from '@nestjs/common';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';
import { Guest } from 'src/entity/guest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
//import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
//import { jwtConstants } from './auth/guestconstants';
//import { JwtModule } from '@nestjs/jwt';
//import { GuestAuthService } from './auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Guest]), AuthModule],
  controllers: [GuestController],
  providers: [GuestService],
  exports: [TypeOrmModule, GuestService],
})
export class GuestModule {}
