import { RegisterData } from "../componets/Form/formTypes";

export interface UserData extends Omit<RegisterData, "password"> {
  _id: string;
  image?: string;
  city?: string;
  phone?: string;
  about?: string;
  website?: string;
  social?: Social[];
  profession?: string;
  accessToken: string;
  refreshToken: string;
}
export interface Social {
  name: string;
  value: string;
}
export interface UserMinData {
  username: string;
  image?: string;
  _id: string;
  profession?: string;
}
export interface CreateChatData {
  users: string[];
  isGroup: boolean;
  name?: string;
}
export interface Chat extends Omit<CreateChatData, "users"> {
  _id: string;
  users: UserMinData[];
  lastMessageAt: Date;
  lastMessage?: LastMessage;
  createdAt: string;
}
export interface LastMessage {
  text?: string;
  image?: string;
  isRead: string;
}
export interface CreateMessageData {
  text?: string;
  messageWithImage?: string;
  image?: string;
  chatId: string;
  sender: string;
}
export interface Message extends Omit<CreateMessageData, "sender"> {
  _id: string;
  createdAt: Date;
  sender: UserMinData;
}
