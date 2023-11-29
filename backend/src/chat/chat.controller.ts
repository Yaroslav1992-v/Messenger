import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { Chat } from './model/chat.model';
import { ChatService } from './chat.service';

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
}
