import { CreateChatData, Chat } from "../store/types";
import httpService from "./httpService";

const apiEndPoint = "/chats/";
const chatService = {
  createChat: async (chat: CreateChatData): Promise<Chat> => {
    const { data } = await httpService.post(`${apiEndPoint}create`, chat);
    return data;
  },
  loadChats: async (userId: string): Promise<Chat[]> => {
    const { data } = await httpService.get(`${apiEndPoint}loadChats/${userId}`);
    return data;
  },
  loadChat: async (chatId: string): Promise<Chat> => {
    const { data } = await httpService.get(`${apiEndPoint}loadChat/${chatId}`);
    return data;
  },
};

export default chatService;
