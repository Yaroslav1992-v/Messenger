import {
  CreateChatData,
  Chat,
  GroupChatCreateData,
  GroupChat,
  ChatOrGroupChat,
  EditChatData,
} from "../store/types";
import httpService from "./httpService";

const apiEndPoint = "/chats/";
const chatService = {
  createChat: async (
    chat: CreateChatData | GroupChatCreateData
  ): Promise<Chat | GroupChat> => {
    const { data } = await httpService.post(`${apiEndPoint}create`, chat);
    return data;
  },
  loadChats: async (userId: string): Promise<Chat[] | GroupChat[]> => {
    const { data } = await httpService.get(`${apiEndPoint}loadChats/${userId}`);
    return data;
  },
  loadChat: async (chatId: string): Promise<Chat | GroupChat> => {
    const { data } = await httpService.get(`${apiEndPoint}loadChat/${chatId}`);
    return data;
  },
  editChat: async (chat: EditChatData): Promise<ChatOrGroupChat> => {
    const { data } = await httpService.patch(`${apiEndPoint}edit`, {
      ...chat,
    });
    return data;
  },
};

export default chatService;
