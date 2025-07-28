import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDTO, CreateUserDTO } from 'src/user/DTO/LoginDTO.dto';
import * as bcrypt from 'bcrypt';
@Controller('users/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user/register')
  @UsePipes(new ValidationPipe())
  async addUser(@Body() myobj: CreateUserDTO): Promise<object> {
    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(myobj.password, salt);
    myobj.password = hashedpassword;
    return this.authService.signUp(myobj);
  }
  @Post('userlogin')
  signIn(@Body() logindata: UserLoginDTO) {
    return this.authService.signIn(logindata);
  }
}
