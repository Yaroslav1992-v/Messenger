import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Chat, EditedChat } from './model/chat.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel('Chat')
    private readonly chatModel: Model<Chat>,
  ) {}
  async createChat(data: Chat) {
    if (!data.isGroup) {
      const chat = await this.chatModel.findOne({
        isGroup: false,
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
    }
    const newChat = await (
      await this.chatModel.create(data)
    ).populate('users', 'username isGroup _id image');

    return newChat;
  }
  async getChatsByUserId(userId: string) {
    const chats = await this.chatModel
      .find({
        users: { $in: [userId] },
        userThatLeft: { $ne: userId },
      })
      .sort({ lastMessageAt: -1 })
      .populate('users', 'username _id image')
      .populate('lastMessage', 'text image  isGroup');

    return chats;
  }
  async getChat(chatId: string) {
    const chat = await this.chatModel
      .findOne({ _id: chatId })
      .populate('users', 'username _id image')
      .populate('lastMessage', 'content notRead');

    return chat;
  }
  async editChat(chat: EditedChat): Promise<Chat> {
    const editedChat = await this.chatModel.findOneAndUpdate(
      { _id: chat._id },
      { $set: chat },
      { new: true },
    );
    if (!editedChat) {
      throw new NotFoundException(`Unutharized`);
    }
    return editedChat.populate('users', 'username _id image');
  }
  async leaveChat(data: {
    chatId: Types.ObjectId;
    userId: Types.ObjectId;
  }): Promise<Chat> {
    const chat = await this.chatModel.findById(data.chatId);

    if (chat.isGroup) {
      if (new Types.ObjectId(data.userId).equals(chat.admin)) {
        chat.admin = chat.users.find(
          (u) => !u._id.equals(new Types.ObjectId(data.userId)),
        );
      }
      chat.users = chat.users.filter(
        (u) => !u._id.equals(new Types.ObjectId(data.userId)),
      );
    } else {
      chat.userThatLeft = data.userId;
    }
    chat.save();
    return chat;
  }
}
