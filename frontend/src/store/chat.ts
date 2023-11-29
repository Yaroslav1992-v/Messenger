import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./createStore";
import { Chat, CreateChatData } from "./types";
import chatService from "../service/chatService";

interface ChatsState {
  isLoading: boolean;
  error: string | null;
  chats: Chat[];
  chat: Chat | null;
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
    chatRequested: (state: ChatsState) => {
      state.dataLoaded = false;
      state.chat = null;
      state.isLoading = true;
    },
    chatReceived: (state: ChatsState, action: PayloadAction<Chat>) => {
      state.chat = null;
      state.dataLoaded = true;
      state.chat = action.payload;
      state.isLoading = false;
    },
    chatsReceived: (state: ChatsState, action: PayloadAction<Chat[]>) => {
      state.dataLoaded = true;
      state.chats = action.payload;
      state.isLoading = false;
    },
    chatsRequestFailed: (state: ChatsState, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    chatCreated: (state: ChatsState, action: PayloadAction<Chat>) => {
      state.chats.push(action.payload);
    },
  },
});
const createChatAction = createAction("/createChatRequested");

export const createChat =
  (data: CreateChatData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(createChatAction());
      const newChat = await chatService.createChat(data);
      dispatch(chatCreated(newChat));
      return newChat._id;
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(chatsRequestFailed(message));
    }
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
} = actions;

export default chatsReducer;
