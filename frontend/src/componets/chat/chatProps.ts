import { RefObject } from "react";
import { Message } from "../../store/types";

export interface ChatHeaderProps {
  name: string;
  image?: string;
  info: string | boolean;
  chatId: string;
}
export interface ChatBodyProps {
  messages: Message[][];
  userId: string;
  chatId: string;
}
export interface MessageProps {
  message: Message;
  userId: string;
  bodyRef: RefObject<HTMLDivElement>;
}
