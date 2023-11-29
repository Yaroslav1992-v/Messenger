import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./createStore";
import { CreateMessageData, Message } from "./types";
import messageService from "../service/messageService";

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
    },
  },
});

const createMessageAction = createAction("/createMessageRequested");

export const createMessage =
  (message: CreateMessageData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(createMessageAction());
      const newMessage = await messageService.createMessage(message);
      dispatch(messageCreated(newMessage));
      return newMessage;
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
export const getMessagesDataLoaded =
  () => (state: { messageStore: MessagesState }) =>
    state.messageStore.dataLoaded;

const { reducer: messageReducer, actions } = messagesSlice;
const {
  messagesRequested,
  messagesRequestFailed,
  messagesReceived,
  messageReceived,
  messageCreated,
} = actions;
export default messageReducer;
