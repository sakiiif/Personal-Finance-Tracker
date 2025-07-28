import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UserLoginDTO {
  @IsEmail() email: string;
  @IsNotEmpty() password: string;
}
export class CreateUserDTO {
  id: number;
  @IsNotEmpty() fullname: string;
  @IsNotEmpty() username: string;
  @IsEmail() email: string;
  @IsNotEmpty()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Passwords must be at least 8 characters, should include atleast one uppercase and one lowercase letter and a special character and a digit',
  })
  password: string;
}
export class ForgetPasswordDto {
  @IsEmail()
  email: string;
}
export class UpdatePasswordDto {
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  // Password strength regex (at least one uppercase, one lowercase, one number, one special character)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
    message:
      'Password too weak. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  newPassword: string;

  @IsString()
  token: string;
}
