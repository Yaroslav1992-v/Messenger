import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { EMAIL_ERROR, USERNAME_ERROR } from 'src/Constants/constants';
import { Social } from '../model/user.model';
import { Types } from 'mongoose';

export class EditDto {
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
  image?: string;
  city?: string;
  phone?: string;
  website?: string;
  about?: string;
  social: Social[];
  _id: Types.ObjectId;
}
export interface UserMin {
  username: string;
  image?: string;
  _id: Types.ObjectId;
}
