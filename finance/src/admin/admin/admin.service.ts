import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDTO } from '../DTO/LoginDTO.dto';
import { Repository } from 'typeorm';
import { Admin } from 'src/entity/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entity/user.entity';
import { ForgetPasswordDto, UpdatePasswordDto } from 'src/admin/DTO/LoginDTO.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService, 
    private readonly configService: ConfigService, 
    private readonly mailerService: MailerService, 
  ) {}

  async findOne(logindata: LoginDTO): Promise<any> {
    return await this.adminRepo.findOneBy({ email: logindata.email });
  }

  async findbyEmail(email: string) {
    return await this.adminRepo.findOne({ where: { email: email } });
  }

  async addAdmin(adminData: Partial<Admin>): Promise<Admin> {
    const existingAdmin = await this.adminRepo.findOne({
      where: { email: adminData.email },
    });
    if (existingAdmin) {
      throw new ConflictException('Admin with this email already exists');
    }

    const admin = this.adminRepo.create(adminData);
    return this.adminRepo.save(admin);
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    await this.userRepo.delete(userId);
  }

  async forgetPassword(forgetPasswordDto: ForgetPasswordDto): Promise<{ message: string }> {
    const { email } = forgetPasswordDto;

    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) {
      throw new NotFoundException('If that email is registered, a reset link has been sent.');
    }

    const payload = { sub: admin.id, email: admin.email };
    const resetToken = this.jwtService.sign(payload, {
      expiresIn: '10m',
      secret: this.configService.get<string>('JWT_RESET_PASSWORD_SECRET'),
    });

    await this.mailerService.sendMail({
      to: admin.email,
      subject: 'Admin Password Reset Request',
      template: 'reset-password',
      context: { email: admin.email, resetToken },
    });

    return { message: 'If that email is registered, a reset link has been sent.' };
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<{ message: string }> {
    const { token, newPassword } = updatePasswordDto;

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_RESET_PASSWORD_SECRET'),
      });

      const adminId = payload.sub;
      const admin = await this.adminRepo.findOne({ where: { id: adminId } });

      if (!admin) {
        throw new NotFoundException('Admin not found');
      }

      admin.password = await bcrypt.hash(newPassword, 10);
      await this.adminRepo.save(admin);

      return { message: 'Password has been successfully updated' };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new BadRequestException('Password reset token has expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new BadRequestException('Invalid password reset token');
      }
      throw error;
    }
  }
}
