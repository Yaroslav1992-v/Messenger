import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserData } from './model/user.model';
import { EditDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  async findOneById(id: string, min: boolean = true): Promise<UserData> {
    let user: UserData;
    if (min) {
      user = await this.userModel.findById(id).select('username _id image');
    } else {
      user = await this.userModel.findById(id);
    }
    if (!user) {
      throw new NotFoundException(`User with ID ${{ id }} not found`);
    }
    return user;
  }
  async editUser(data: EditDto) {
    const existingUser = await this.userModel.findOne({ email: data.email });
    if (existingUser && existingUser._id.toString() !== data._id.toString()) {
      throw new NotFoundException({
        email: `Email ${data.email} already exists`,
      });
    }
    const user = await this.userModel
      .findByIdAndUpdate(data._id, data, { new: true })
      .select('-password -updatedAt -__v -createdAt');
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }
}
