import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthUser } from 'src/Constants/constants';
import { AuthGuard } from 'src/auth/guards/jwt.guard';
import { EditDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('getById/:id')
  async findUserById(@Param('id') id: string) {
    return this.userService.findOneById(id, false);
  }
  @Get('getMinById/:id')
  async findMinUserById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }
  @Get('searchUser/:name')
  @UseGuards(AuthGuard)
  async searchByName(@Param('name') name: string) {
    try {
      return this.userService.findUsersByName(name);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @UsePipes(new ValidationPipe())
  @Patch('edit')
  @UseGuards(AuthGuard)
  async editUser(@Body() data: EditDto, @Req() req: AuthUser) {
    try {
      if (req.user.id !== data._id) {
        throw new NotFoundException('Unathorized');
      }
      return this.userService.editUser(data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
