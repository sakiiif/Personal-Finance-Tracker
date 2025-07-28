import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO, CreateAdminDto } from '../DTO/LoginDTO.dto';
import * as bcrypt from 'bcrypt';
import { AdminService } from 'src/admin/admin/admin.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private adminservice: AdminService,
    private jwtService: JwtService,
  ) {}
  async signUp(myobj: CreateAdminDto): Promise<object> {
    return await this.adminservice.addAdmin(myobj);
  }
  async signIn(logindata: LoginDTO): Promise<{ access_token: string }> {
    const admin = await this.adminservice.findOne(logindata);
    if (!admin) {
      throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(logindata.password, admin.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = logindata;
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
