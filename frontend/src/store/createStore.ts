import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./auth";

const rootReducer = combineReducers({
  authStore: authReducer,
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
