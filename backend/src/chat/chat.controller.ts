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
import { Chat, EditedChat } from './model/chat.model';
import { ChatService } from './chat.service';
import { AuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthUser } from 'src/Constants/constants';
import { Types } from 'mongoose';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post('create')
  async createChat(@Body() chat: Chat) {
    try {
      return await this.chatService.createChat(chat);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Get('loadChats/:userId')
  async loadChats(@Param('userId') userId: string) {
    try {
      return await this.chatService.getChatsByUserId(userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Get('loadChat/:chatId')
  async loadChat(@Param('chatId') chatId: string) {
    try {
      return await this.chatService.getChat(chatId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Patch('edit')
  @UseGuards(AuthGuard)
  async editChat(@Body() data: EditedChat, @Req() req: AuthUser) {
    try {
      if (data.isGroup && req.user.id !== data.admin) {
        throw new NotFoundException('Unathorized');
      }
      return this.chatService.editChat(data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Patch('leave')
  @UseGuards(AuthGuard)
  async leaveChat(
    @Body() data: { chatId: Types.ObjectId; userId: Types.ObjectId },
  ) {
    try {
      return this.chatService.leaveChat(data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
