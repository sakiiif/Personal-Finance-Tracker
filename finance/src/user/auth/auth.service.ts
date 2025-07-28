import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user/user.service';
import { UserLoginDTO, CreateUserDTO } from 'src/user/DTO/LoginDTO.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { ExpenseService } from 'src/expense/expense.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
    private expenseService: ExpenseService,
  ) {}

  // Modified signUp method to include token generation
  async signUp(myobj: CreateUserDTO): Promise<{ access_token: string }> {
    // Create a new user from the provided DTO
    const newUser = this.userRepo.create(myobj);
    
    // Save the new user to the database
    const savedUser = await this.userRepo.save(newUser);

    // Optionally, create default expenses or other related data for the user
    await this.expenseService.createExpenseWithUserId(savedUser.id);

    // Define a payload for the token
    const payload = {
      sub: savedUser.id,
      username: savedUser.username,
      userRole: savedUser.role,  // If you are using roles or other data
    };

    // Generate the token using the JWT service
    const token = await this.jwtService.signAsync(payload);

    // Return the token along with a success message or user data if needed
    return {
      access_token: token,
    };
  }

  // Modified signIn method for user login and token generation
  async signIn(logindata: UserLoginDTO): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(logindata);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(logindata.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Define a secure payload
    const payload = {
      sub: user.id,
      username: user.username,
      userRole: user.role,
    };

    // Sign the token with the secure payload
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
    };
  }
}
