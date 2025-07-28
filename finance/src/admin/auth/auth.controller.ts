import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, CreateAdminDto } from '../DTO/LoginDTO.dto';
import * as bcrypt from 'bcrypt';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  @UsePipes(new ValidationPipe())
  async addUser(@Body() myobj: CreateAdminDto): Promise<object> {
    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(myobj.password, salt);
    myobj.password = hashedpassword;
    return this.authService.signUp(myobj);
  }
  @Post('login')
  signIn(@Body() logindata: LoginDTO) {
    return this.authService.signIn(logindata);
  }
}
