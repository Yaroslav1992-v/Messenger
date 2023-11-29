import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./auth";
import userReducer from "./user";
import chatsReducer from "./chat";
import messageReducer from "./message";

const rootReducer = combineReducers({
  authStore: authReducer,
  usersStore: userReducer,
  chatStore: chatsReducer,
  messageStore: messageReducer,
});
function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
const store = createStore();
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
