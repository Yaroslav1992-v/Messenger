import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';
import {
  EMAIL_ERROR,
  PASSWORD_ERROR,
  USERNAME_ERROR,
} from 'src/Constants/constants';

export class RegisterDto {
  @IsString({
    message: USERNAME_ERROR,
  })
  @IsNotEmpty({
    message: USERNAME_ERROR,
  })
  @MinLength(3, {
    message: USERNAME_ERROR,
  })
  username: string;
  @IsEmail()
  @IsNotEmpty({
    message: EMAIL_ERROR,
  })
  email: string;
  @IsString({
    message: PASSWORD_ERROR,
  })
  @IsNotEmpty({
    message: PASSWORD_ERROR,
  })
  @MinLength(8, {
    message: PASSWORD_ERROR,
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: PASSWORD_ERROR,
  })
  password: string;
  @IsOptional()
  image?: string;
}
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
