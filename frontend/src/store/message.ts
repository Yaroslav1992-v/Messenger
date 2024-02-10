import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./createStore";
import { CreateMessageData, Message, UndreadCount } from "./types";
import messageService from "../service/messageService";
import fileService from "../service/fileService";

interface MessagesState {
  isLoading: boolean;
  error: string | null;
  messages: Message[];
  dataLoaded: boolean;
  unreadCount: UndreadCount[];
}

const messagesInitialState: MessagesState = {
  isLoading: false,
  error: null,
  messages: [],
  dataLoaded: false,
  unreadCount: [],
};

export const messagesSlice = createSlice({
  name: "messageStore",
  initialState: messagesInitialState,
  reducers: {
    messagesRequested: (state: MessagesState) => {
      state.messages = [];
      state.isLoading = true;
    },
    messagesUpdateRequested: (state: MessagesState) => {
      state.isLoading = true;
    },
    messagesUpdateSuccess: (
      state: MessagesState,
      action: PayloadAction<Message>
    ) => {
      const index = state.messages.findIndex(
        (c) => c._id === action.payload._id
      );
      state.messages[index] = action.payload;
      state.isLoading = false;
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
    unreadReceived: (
      state: MessagesState,
      action: PayloadAction<UndreadCount[]>
    ) => {
      state.unreadCount = action.payload;
    },
    unreadDecrease: (state: MessagesState, action: PayloadAction<Message>) => {
      const index = state.unreadCount.findIndex(
        (u) => u.chatId === action.payload.chatId
      );
      state.unreadCount[index].count = state.unreadCount[index].count - 1;
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
    messageDeleted: (state: MessagesState, action: PayloadAction<string>) => {
      state.messages = state.messages.filter((m) => m._id !== action.payload);
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
export const updateMessage =
  (message: Message, unread?: boolean) => async (dispatch: AppDispatch) => {
    try {
      dispatch(messagesUpdateRequested());
      const updatedMessage = await messageService.editMessage(message);
      dispatch(messagesUpdateSuccess(updatedMessage));

      if (unread) {
        dispatch(unreadDecrease(updatedMessage));
      }
      return updatedMessage;
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(messagesRequestFailed(message));
    }
  };
export const deleteMessage =
  (message: Message) => async (dispatch: AppDispatch) => {
    try {
      if (message.image) {
        await fileService.deleteFile(message.image);
      }
      await messageService.deleteMessage(message._id);
      dispatch(messageDeleted(message._id));
      const updatedMessage = await messageService.editMessage(message);
      dispatch(messagesUpdateSuccess(updatedMessage));

      return updatedMessage;
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(messagesRequestFailed(message));
    }
  };
export const countUnread =
  (chatIds: string[]) => async (dispatch: AppDispatch) => {
    try {
      const unread = await messageService.countUnread(chatIds);
      dispatch(unreadReceived(unread));
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(messagesRequestFailed(message));
    }
  };
export const recivedMessage = (msg: Message) => (dispatch: AppDispatch) => {
  dispatch(messageReceived(msg));
};
export const getUnread = () => (state: { messageStore: MessagesState }) =>
  state.messageStore.unreadCount;
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
  messageReceived,
  messageCreated,
  messageCreateRequested,
  messagesUpdateRequested,
  messagesUpdateSuccess,
  unreadReceived,
  messageDeleted,
  unreadDecrease,
} = actions;
export default messageReducer;
