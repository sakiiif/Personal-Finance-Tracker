import {
  Controller,
  Get,
  Param,
  UseGuards,
  Delete,
  NotFoundException,
  ParseIntPipe,
  Post,
  Body,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthAdminGuard } from 'src/admin/auth/authAdmin.guard';
import { UserService } from 'src/user/user/user.service';
import { ForgetPasswordDto, UpdatePasswordDto } from 'src/admin/DTO/LoginDTO.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthAdminGuard)
  @Get('findbyEmail/:email')
  async findAdminByEmail(@Param('email') email: string): Promise<object> {
    const admin = await this.adminService.findbyEmail(email);
    return admin;
  }

  @UseGuards(AuthAdminGuard)
  @Delete('users/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<{ message: string }> {
    try {
      await this.adminService.deleteUser(userId);
      return { message: `User with ID ${userId} has been deleted successfully` };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post('forgetpassword')
  async forgetPassword(
    @Body() forgetPasswordDto: ForgetPasswordDto,
  ): Promise<{ message: string }> {
    return this.adminService.forgetPassword(forgetPasswordDto);
  }

  @Post('updatepassword')
  async updatePassword(
    @Req() request: Request,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<{ message: string }> {
    return this.adminService.updatePassword(updatePasswordDto);
  }

}