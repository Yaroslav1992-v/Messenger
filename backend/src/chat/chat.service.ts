import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Chat } from './model/chat.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Chat')
    private readonly chatModel: Model<Chat>,
  ) {}
  async createChat(data: Chat) {
    const chat = await this.chatModel.findOne({
      users: {
        $all: [
          new Types.ObjectId(data.users[0]),
          new Types.ObjectId(data.users[1]),
        ],
      },
    });

    if (chat) {
      return chat;
    }
    const newChat = await (
      await this.chatModel.create(data)
    ).populate('users', 'username _id image');
    return newChat;
  }
  async getChatsByUserId(userId: string) {
    const chats = await this.chatModel
      .find({
        users: { $in: [userId] },
      })
      .sort({ lastMessageAt: -1 })
      .populate('users', 'username _id image')
      .populate('lastMessage', 'text image  isRead');

    return chats;
  }
  async getChat(chatId: string) {
    const chat = await this.chatModel
      .findOne({ _id: chatId })
      .populate('users', 'username _id image')
      .populate('lastMessage', 'content isRead');

    return chat;
  }
}
