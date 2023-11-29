import { Message, UserMinData } from "../../store/types";

export interface ChatHeaderProps {
  name: string;
  image?: string;
  _id: string;
}
export interface ChatBodyProps {
  messages: Message[][];
  userId: string;
  chatId: string;
}
export interface MessageProps {
  message: Message;
  userId: string;
}
