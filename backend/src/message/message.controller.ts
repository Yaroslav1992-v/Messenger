import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { AuthGuard } from 'src/auth/guards/jwt.guard';
import { MessageService } from './message.service';
import { Message, MessageEdit } from './model/message.model';
import { AuthUser } from 'src/Constants/constants';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post('create')
  @UseGuards(AuthGuard)
  async createMessage(@Body() message: Message) {
    try {
      return await this.messageService.createMessage(message);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Get('getMessages/:chatId')
  @UseGuards(AuthGuard)
  async getMessages(@Param('chatId') chatId: Types.ObjectId) {
    try {
      return await this.messageService.getMessages(chatId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Post('count')
  @UseGuards(AuthGuard)
  async count(@Body() data: Types.ObjectId[], @Req() req: AuthUser) {
    try {
      return await this.messageService.countUnread(data, req.user.id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Patch('editMessage')
  @UseGuards(AuthGuard)
  async editMessage(@Body() data: MessageEdit) {
    try {
      return this.messageService.editMessage(data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
