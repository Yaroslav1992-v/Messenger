import { CreateMessageData, Message, UndreadCount } from "../store/types";
import httpService from "./httpService";

const apiEndPoint = "/message/";
const messageService = {
  createMessage: async (message: CreateMessageData): Promise<Message> => {
    const { data } = await httpService.post(`${apiEndPoint}create`, message);
    return data;
  },
  loadMessages: async (chatId: string): Promise<Message[]> => {
    const { data } = await httpService.get(
      `${apiEndPoint}getMessages/${chatId}`
    );
    return data;
  },
  editMessage: async (message: Message): Promise<Message> => {
    const { data } = await httpService.patch(`${apiEndPoint}editMessage`, {
      ...message,
    });
    return data;
  },
  countUnread: async (chatIds: string[]): Promise<UndreadCount[]> => {
    const { data } = await httpService.post(`${apiEndPoint}count`, chatIds);
    return data;
  },
};

export default messageService;
