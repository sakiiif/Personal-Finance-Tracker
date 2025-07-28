import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GuestAuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './guestconstants';
import { GuestService } from '../guest.service';
import { GuestModule } from '../guest.module';

@Module({
  imports: [
    forwardRef(() => GuestModule),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [AuthController],
  providers: [GuestAuthService, GuestService],
  exports: [GuestAuthService],
})
export class AuthModule {}
