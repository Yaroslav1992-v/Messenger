import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Chat } from '../chat/model/chat.model';
import { Message } from './model/message.model';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message')
    private readonly messageModel: Model<Message>,
    @InjectModel('Chat')
    private readonly chatModel: Model<Chat>,
  ) {}
  async createMessage(msg: Message) {
    const newMessage = await this.messageModel.create(msg);
    await this.chatModel.findByIdAndUpdate(
      {
        _id: newMessage.chatId,
      },
      {
        lastMessageAt: Date.now(),
        lastMessage: newMessage._id,
      },
    );
    return newMessage.populate('sender', '_id username image');
  }
  async getMessages(chatId: Types.ObjectId): Promise<Message[]> {
    const messages = await this.messageModel
      .find({ chatId })
      .populate('sender', '_id username image')
      .exec();
    if (!messages) {
      throw new NotFoundException(
        `Messagess from chat with ID ${{ chatId }} not found`,
      );
    }
    return messages;
  }
}
