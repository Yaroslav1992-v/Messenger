import { Message } from "../../store/types";

export interface ChatHeaderProps {
  name: string;
  image?: string;
  info: string | boolean;
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
