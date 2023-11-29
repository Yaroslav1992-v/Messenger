import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { AuthGuard } from 'src/auth/guards/jwt.guard';
import { MessageService } from './message.service';
import { Message } from './model/message.model';

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
}
