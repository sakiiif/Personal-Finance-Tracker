import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GuestAuthService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Generates a JWT token for guest users with a 5-second expiration.
   * @returns An object containing the access token.
   */
  generateGuestToken(): { accessToken: string } {
    const payload = {
      role: 'guest',
      // You can add more claims here if needed
    };

    const accessToken = this.jwtService.sign(payload); // 5-second expiration

    return { accessToken };
  }
}
