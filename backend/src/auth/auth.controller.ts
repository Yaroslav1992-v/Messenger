import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ALREADY_EXISTS } from 'src/Constants/constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const oldUser = await this.authService.findUser(dto.email);
    if (oldUser) {
      throw new BadRequestException(ALREADY_EXISTS);
    }
    return this.authService.createUser(dto);
  }
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
