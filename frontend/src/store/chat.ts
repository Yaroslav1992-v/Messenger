import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./createStore";
import {
  Chat,
  ChatOrGroupChat,
  CreateChatData,
  EditChatData,
  GroupChat,
  GroupChatCreateData,
  LastMessage,
  Message,
} from "./types";
import chatService from "../service/chatService";
import fileService from "../service/fileService";

interface ChatsState {
  isLoading: boolean;
  error: string | null;
  chats: ChatOrGroupChat[];
  chat: Chat | GroupChat | null;
  dataLoaded: boolean;
}
const initialState: ChatsState = {
  isLoading: false,
  error: null,
  chats: [],
  chat: null,
  dataLoaded: false,
};

export const chatsSlice = createSlice({
  name: "chatStore",
  initialState,
  reducers: {
    chatsRequested: (state: ChatsState) => {
      state.chats = [];
      state.isLoading = true;
    },
    chatActionRequest: (state: ChatsState) => {
      state.isLoading = true;
    },

    chatRequested: (state: ChatsState) => {
      state.dataLoaded = false;
      state.chat = null;
      state.isLoading = true;
    },
    chatReceived: (
      state: ChatsState,
      action: PayloadAction<ChatOrGroupChat>
    ) => {
      state.chat = null;
      state.dataLoaded = true;
      state.chat = action.payload;
      state.isLoading = false;
    },
    chatsReceived: (
      state: ChatsState,
      action: PayloadAction<ChatOrGroupChat[]>
    ) => {
      state.dataLoaded = true;
      state.chats = action.payload;
      state.isLoading = false;
    },
    chatsRequestFailed: (state: ChatsState, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    chatCreated: (
      state: ChatsState,
      action: PayloadAction<ChatOrGroupChat>
    ) => {
      state.chats.push(action.payload);
      state.isLoading = false;
    },
    chatUpdate: (state: ChatsState, action: PayloadAction<Message>) => {
      const index = state.chats.findIndex(
        (c) => c._id === action.payload.chatId
      );
      const msg = {
        image: action.payload.image,
        text: action.payload.text,
      };
      state.chats[index].lastMessage = msg as LastMessage;
    },
    chatEdited: (state: ChatsState, action: PayloadAction<ChatOrGroupChat>) => {
      const index = state.chats.findIndex((c) => c._id === action.payload._id);
      state.chats[index] = action.payload;
      state.chat = action.payload;
      state.isLoading = false;
    },
  },
});
export const createGroupChat =
  (data: GroupChatCreateData, file?: File) => async (dispatch: AppDispatch) => {
    let image;
    try {
      dispatch(chatActionRequest());
      if (file) {
        image = await fileService.uploadFile(file);
        if (data.image) {
          await fileService.deleteFile(data.image);
        }
        data = { ...data, image: image };
      }
      const newChat = await chatService.createChat(data);
      dispatch(chatCreated(newChat));
      return newChat._id;
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(chatsRequestFailed(message));
    }
  };
export const createChat =
  (data: CreateChatData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(chatActionRequest());

      const newChat = await chatService.createChat(data);
      dispatch(chatCreated(newChat));
      console.log(newChat);
      return newChat._id;
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(chatsRequestFailed(message));
    }
  };
export const updateChat = (message: Message) => (dispatch: AppDispatch) => {
  dispatch(chatUpdate(message));
};
export const loadChats = (userId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(chatsRequested());
    const chats = await chatService.loadChats(userId);

    dispatch(chatsReceived(chats));
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    dispatch(chatsRequestFailed(message));
  }
};
export const editChat =
  (chat: EditChatData, file?: File) => async (dispatch: AppDispatch) => {
    let image;
    try {
      dispatch(chatActionRequest());
      let data = { ...chat };
      if (file) {
        image = await fileService.uploadFile(file);

        if (chat.image) {
          await fileService.deleteFile(chat.image);
        }
        data = { ...data, image: image };
      }
      let newData: EditChatData = { ...data };
      const updatedChat = await chatService.editChat(newData);
      dispatch(chatEdited(updatedChat));
      return "Chat Edited";
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(chatsRequestFailed(message));
    }
  };

export const loadChatById =
  (chatId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(chatRequested());
      const chats = await chatService.loadChat(chatId);
      dispatch(chatReceived(chats));
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(chatsRequestFailed(message));
    }
  };
export const getNewestChatId = () => (state: { chatStore: ChatsState }) => {
  if (state.chatStore.chats.length > 0) {
    return state.chatStore.chats[0]._id;
  }
};
export const getChats = () => (state: { chatStore: ChatsState }) =>
  state.chatStore.chats;
export const getIsLoading = () => (state: { chatStore: ChatsState }) =>
  state.chatStore.isLoading;
export const getChat = () => (state: { chatStore: ChatsState }) =>
  state.chatStore.chat;
export const getChatsDataLoaded = () => (state: { chatStore: ChatsState }) =>
  state.chatStore.dataLoaded;
export const getChatById =
  (chatId: string) => (state: { chatStore: ChatsState }) =>
    state.chatStore.chats.find((c) => c._id === chatId);
const { reducer: chatsReducer, actions } = chatsSlice;
const {
  chatsRequested,
  chatRequested,
  chatReceived,
  chatsRequestFailed,
  chatsReceived,
  chatCreated,
  chatEdited,
  chatUpdate,
  chatActionRequest,
} = actions;

export default chatsReducer;
