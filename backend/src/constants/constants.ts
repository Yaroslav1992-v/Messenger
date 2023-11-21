import { Types } from 'mongoose';

export const ALREADY_EXISTS = 'User with this email already exists!';
export const WRONG_DATA = 'Wrong email or password';
export const USERNAME_ERROR =
  'username must be longer than or equal to 3 characters';
export const EMAIL_ERROR = 'Invalid Email';
export const PASSWORD_ERROR =
  "'password too weak. Must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number',";
export interface AuthUser {
  user: { id: Types.ObjectId; iat: number; exp: number };
}
