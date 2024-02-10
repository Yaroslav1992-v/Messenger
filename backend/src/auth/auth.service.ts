import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from 'src/jwt/jwt.service';
import { Model, Types } from 'mongoose';
import {
  WRONG_DATA,
  WRONG_DATA_3TIMES,
  hasPassed24Hours,
} from 'src/Constants/constants';
import { User } from 'src/user/model/user.model';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(user: RegisterDto) {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const newUser = await this.userModel.create({
      ...user,
      password: hashedPassword,
    });
    const tokens = await this.generateTokens({ id: newUser._id });
    return { ...newUser.toJSON(), ...tokens };
  }
  async generateTokens(id: {
    id: Types.ObjectId;
  }): Promise<{ [key: string]: string }> {
    return {
      accessToken: await this.jwtService.signAccessToken(id),
      refreshToken: await this.jwtService.signRefreshToken(id),
    };
  }
  async login({ email, password }: LoginDto): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException(WRONG_DATA);
    }
    if (user.locked && user.locked === 3 && !hasPassed24Hours(user.updatedAt)) {
      throw new BadRequestException(WRONG_DATA_3TIMES);
    }
    if (user && bcrypt.compareSync(password, user.password)) {
      const tokens = await this.generateTokens({ id: user._id });
      if (user.locked) {
        await this.userModel.findByIdAndUpdate(user._id, {
          ...user,
          locked: 0,
        });
      }
      return { ...user.toJSON(), ...tokens };
    } else {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        user._id,
        { ...user, locked: !user.locked ? 1 : (user.locked += 1) },
        { new: true },
      );
      if (updatedUser.locked === 3) {
        throw new BadRequestException(WRONG_DATA_3TIMES);
      }

      throw new BadRequestException(WRONG_DATA);
    }
  }
  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
