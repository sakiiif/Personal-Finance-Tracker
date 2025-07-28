import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty({ message: 'fullName is required' })
  @Length(8, 100, {
    message: 'fullName length must be between 8 and 100 characters',
  })
  @IsString({ message: 'fullName must be a string' })
  fullname: string;

  @IsNotEmpty({ message: 'userName is required' })
  @Length(4, 100, {
    message: 'userName length must be between 8 and 100 characters',
  })
  @IsString({ message: 'userName must be a string' })
  username: string;

  @IsEmail({}, { message: 'email must be valid' })
  @IsNotEmpty({ message: 'email is required.' })
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Passwords must be at least 8 characters, should include atleast one uppercase and one lowercase letter and a special character and a digit',
  })
  password: string;
}

export class LoginDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class PromoteAdminDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ForgetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;
  token: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Passwords must be at least 8 characters, should include atleast one uppercase and one lowercase letter and a special character and a digit',
  })
  newPassword: string;
}