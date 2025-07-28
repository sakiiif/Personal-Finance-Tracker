import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  UserLoginDTO,
  CreateUserDTO,
  ForgetPasswordDto,
  UpdatePasswordDto,
} from 'src/user/DTO/LoginDTO.dto';
import { Like, Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ExpenseService } from 'src/expense/expense.service';
import { Admin } from 'src/entity/admin.entity';
import { AdminService } from 'src/admin/admin/admin.service';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly expenseService: ExpenseService,
    private readonly adminService: AdminService,
    private configService: ConfigService,
    private mailerService: MailerService,
    private jwtService: JwtService,
  ) {}

  async findOne(logindata: UserLoginDTO): Promise<any> {
    return await this.userRepo.findOneBy({ email: logindata.email });
  }

  async changeRole(user: User, newRole: string): Promise<User> {
    user.role = newRole;
    return this.userRepo.save(user);
  }

  async promoteToAdmin(email: string): Promise<Admin> {
    const user = await this.findbyEmail(email);

    if (user.role === 'admin') {
      throw new ConflictException('User is already an admin');
    }

    // Update user role to 'admin'
    await this.changeRole(user, 'admin');

    // Add user to admin table
    const admin = await this.adminService.addAdmin({
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      password: user.password,
    });

    return admin;
  }

  async findbyEmail(email: string) {
    return await this.userRepo.findOne({ where: { email: email } });
  }

  async findbyUsername(username: string) {
    return await this.userRepo.findOne({ where: { username: username } });
  }

  async addUser(myobj: CreateUserDTO): Promise<object> {
    return await this.userRepo.save(myobj);
  }

  async findbyid(id: number) {
    return await this.userRepo.findOne({ where: { id: id } });
  }

  async update(id: any, userUpdate: CreateUserDTO) {
    // Hash password if needed
    if (userUpdate.password) {
      userUpdate.password = await bcrypt.hash(userUpdate.password, 10);
    }

    // Save changes to the database via a repository
    await this.userRepo.update(id, userUpdate);

    // Return updated entity, or a success message, etc.
    return this.userRepo.findOneBy(id);
  }

  async deleteuser(id: number) {
    return await this.userRepo.delete(id);
  }

  async getUsers(subString: string): Promise<User[]> {
    return await this.userRepo.find({
      where: { fullname: Like(`%${subString}%`) },
    });
  }

  // নতুন মেথড: সমস্ত ব্যবহারকারীর তথ্য রিটার্ন করার জন্য
  async getAllUsers(): Promise<User[]> {
    return await this.userRepo.find(); // কোনো শর্ত ছাড়াই সব ব্যবহারকারীর তথ্য রিটার্ন
  }

  async forgetPassword(
    forgetPasswordDto: ForgetPasswordDto,
  ): Promise<{ message: string }> {
    const { email } = forgetPasswordDto;
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      // For security reasons, do not reveal whether the email exists
      throw new NotFoundException(
        'If that email is registered, a reset link has been sent.',
      );
    }

    // Generate a JWT token with guest's ID and email
    const payload = { sub: user.id, email: user.email };
    const resetToken = this.jwtService.sign(payload, {
      expiresIn: '10m', // Token expires in 10 minutes
      secret: this.configService.get<string>('JWT_RESET_PASSWORD_SECRET'),
    });

    // Send reset email with the token
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Password Reset Request',
      template: 'reset-password', // Name of the template file (reset-password.hbs)
      context: {
        email: user.email,
        resetToken,
      },
    });

    return {
      message: 'If that email is registered, a reset link has been sent.',
    };
  }

  async updatePassword(
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<{ message: string }> {
    const { token, newPassword } = updatePasswordDto;

    try {
      // Verify the token
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_RESET_PASSWORD_SECRET'),
      });

      // Extract user ID from token
      const userId = payload.sub;

      // Find the guest by ID
      const guest = await this.userRepo.findOne({ where: { id: userId } });

      if (!guest) {
        throw new NotFoundException('Guest not found');
      }

      // Update the guest's password
      guest.password = await bcrypt.hash(newPassword, 10); // Hash the new password

      await this.userRepo.save(guest);

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
