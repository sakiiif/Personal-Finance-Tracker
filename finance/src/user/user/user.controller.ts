import {
  Controller,
  Param,
  Patch,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDTO,
  ForgetPasswordDto,
  UpdatePasswordDto,
} from '../DTO/LoginDTO.dto';
import { AuthUserGuard } from '../auth/authUser.guard';
import { AuthAdminGuard } from 'src/admin/auth/authAdmin.guard';
import { PromoteAdminDTO } from 'src/admin/DTO/LoginDTO.dto';
import { Admin } from 'src/entity/admin.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('user/update')
  @UseGuards(AuthUserGuard)
  async updateUser(
    @Req() request: Request,
    @Body() userUpdateDto: CreateUserDTO,
  ) {
    const authenticatedUser = request['user'];
    if (authenticatedUser.role === 'admin') {
      throw new UnauthorizedException(
        'Admin not allowed to view specific user expense report',
      );
    }
    if (!authenticatedUser) {
      throw new UnauthorizedException('User not authenticated');
    }

    const userId = authenticatedUser.sub;
    const user = await this.userService.findbyid(userId);
    if (!user) {
      throw new NotFoundException(`User with id=${userId} not found`);
    }
    return this.userService.update(user.id, userUpdateDto);
  }

  @Post('user/delete')
  @UseGuards(AuthAdminGuard)
  async deleteUser(@Req() request: Request) {
    const authenticatedUser = request['user'];
    if (!authenticatedUser) {
      throw new UnauthorizedException('User not authenticated');
    }

    const userId = authenticatedUser.sub;
    const user = await this.userService.findbyid(userId);
    if (!user) {
      throw new NotFoundException(`User with id=${userId} not found`);
    }
    return this.userService.deleteuser(user.id);
  }

  @Get('user/:username')
  @UseGuards(AuthAdminGuard)
  async findUserByUsername(@Param('username') username: string) {
    const user = await this.userService.findbyEmail(username);
    return user;
  }

  @Post('adminpromote')
  @UseGuards(AuthAdminGuard)
  async giveAdminRole(
    @Body() promoteAdminDto: PromoteAdminDTO,
  ): Promise<object> {
    const { email } = promoteAdminDto;
    try {
      const admin: Admin = await this.userService.promoteToAdmin(email);
      return {
        message: 'User successfully promoted to admin',
        admin: {
          fullname: admin.fullname,
          username: admin.username,
          email: admin.email,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('forgetpassword')
  async forgetPassword(
    @Body() forgetPasswordDto: ForgetPasswordDto,
  ): Promise<{ message: string }> {
    return this.userService.forgetPassword(forgetPasswordDto);
  }

  @Post('updatepassword')
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<{ message: string }> {
    return this.userService.updatePassword(updatePasswordDto);
  }

  @Get('profile')
  @UseGuards(AuthUserGuard)
  async getUserProfile(@Req() request: Request) {
    const authenticatedUser = request['user'];
    if (!authenticatedUser) {
      throw new UnauthorizedException('User not authenticated');
    }

    const userId = authenticatedUser.sub;
    const user = await this.userService.findbyid(userId);
    if (!user) {
      throw new NotFoundException(`User with id=${userId} not found`);
    }
    return user;
  }

  // New route to get all users
  @Get('all')
  @UseGuards(AuthAdminGuard)
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
}
