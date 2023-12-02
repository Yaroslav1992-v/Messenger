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
  isGroup: false;
}

export interface Chat extends Omit<CreateChatData, "users"> {
  _id: string;
  users: UserMinData[];
  lastMessageAt: Date;
  lastMessage?: LastMessage;
  createdAt: string;
  updatedAt: Date;
}
export interface GroupChatCreateData {
  isGroup: true;
  name: string;
  admin: string;
  users: string[];
  description?: string;
  image?: string;
}
export interface GroupChat extends Omit<GroupChatCreateData, "users"> {
  users: UserMinData[];
  _id: string;
  name: string;
  admin: string;
  lastMessageAt: Date;
  lastMessage?: LastMessage;
  createdAt: string;
  updatedAt: Date;
}
export interface EditChatData extends GroupChatCreateData {
  _id: string;
}
export interface LastMessage {
  text?: string;
  image?: string;
  isRead: string;
}
export interface CreateMessageData {
  text?: string;
  image?: File | string;
  chatId: string;
  sender: string;
}
export interface Message extends Omit<CreateMessageData, "sender"> {
  _id: string;
  image?: string;
  createdAt: Date;
  sender: UserMinData;
}
export type ChatOrGroupChat = Chat | GroupChat;
