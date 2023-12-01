import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./createStore";
import { CreateMessageData, Message } from "./types";
import messageService from "../service/messageService";
import fileService from "../service/fileService";

interface MessagesState {
  isLoading: boolean;
  error: string | null;
  messages: Message[];
  dataLoaded: boolean;
}

const messagesInitialState: MessagesState = {
  isLoading: false,
  error: null,
  messages: [],
  dataLoaded: false,
};

export const messagesSlice = createSlice({
  name: "messageStore",
  initialState: messagesInitialState,
  reducers: {
    messagesRequested: (state: MessagesState) => {
      state.messages = [];
      state.isLoading = true;
    },
    messageCreateRequested: (state: MessagesState) => {
      state.isLoading = true;
    },
    messagesReceived: (
      state: MessagesState,
      action: PayloadAction<Message[]>
    ) => {
      state.dataLoaded = true;
      state.messages = action.payload;
      state.isLoading = false;
    },
    messageReceived: (state: MessagesState, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    messagesRequestFailed: (
      state: MessagesState,
      action: PayloadAction<string>
    ) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    messageCreated: (state: MessagesState, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
      state.isLoading = false;
    },
  },
});

export const createMessage =
  (message: CreateMessageData) => async (dispatch: AppDispatch) => {
    try {
      let image;
      dispatch(messageCreateRequested());
      if (message.image && message.image instanceof File) {
        image = await fileService.uploadFile(message.image);
      }
      const newMessage = await messageService.createMessage({
        ...message,
        image,
      });
      dispatch(messageCreated(newMessage));
      return "Message Created";
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(messagesRequestFailed(message));
    }
  };

export const loadMessages =
  (chatId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(messagesRequested());
      const messages = await messageService.loadMessages(chatId);
      dispatch(messagesReceived(messages));
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(messagesRequestFailed(message));
    }
  };

export const getMessages = () => (state: { messageStore: MessagesState }) =>
  state.messageStore.messages;
export const getIsLoading = () => (state: { messageStore: MessagesState }) =>
  state.messageStore.isLoading;
export const getMessagesDataLoaded =
  () => (state: { messageStore: MessagesState }) =>
    state.messageStore.dataLoaded;

const { reducer: messageReducer, actions } = messagesSlice;
const {
  messagesRequested,
  messagesRequestFailed,
  messagesReceived,
  messageCreated,
  messageCreateRequested,
} = actions;
export default messageReducer;
