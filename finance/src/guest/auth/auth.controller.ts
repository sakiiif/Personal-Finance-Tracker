import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GuestAuthService } from './auth.service';
import { GuestService } from '../guest.service';
import { Guest } from 'src/entity/guest.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly guestAuthService: GuestAuthService,
    private readonly guestService: GuestService,
  ) {}
  @Post('joinasguest')
  //@Throttle({ default: { ttl: 60000, limit: 5 } })
  @HttpCode(HttpStatus.CREATED)
  async joinAsGuest(): Promise<{
    message: string;
    guest: { id: number; userName: string };
  }> {
    const guest: Guest = await this.guestService.createGuest();
    return {
      message: 'You will be logged out in 2 minutes please sign up to continue',
      guest: {
        id: guest.id,
        userName: guest.userName,
      },
    };
  }
}
