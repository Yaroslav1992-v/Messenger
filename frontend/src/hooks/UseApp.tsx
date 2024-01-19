import { Route, Routes } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/createStore";
import React from "react";
import localStorageService from "../service/localStorageService";
import Home from "../pages/Home/Home";
import {
  getCurrentUser,
  getIsLoggedIn,
  loadCurrentUser,
  logOut,
} from "../store/auth";
import { UserMinData } from "./../store/types";
import { loadChats } from "../store/chat";
import configFile from "../config.json";
let socket: Socket;
export interface AppContextValue {
  profileId: string;
  socket: Socket;
  bar: "users" | "chats" | null;
  isDark: boolean;
  profile: boolean;
  menuShow: boolean;
  dropdown: boolean;
  user: UserMinData | null;
  handleMode: () => void;
  toggleMenu: () => void;
  setBar: (bar: "users" | "chats" | null) => void;
  handleChat: (id: string) => void;
  activeChat: string;
  openDropDown: () => void;
  openProfile: (userId?: string) => void;
  closeProfile: () => void;
  closeDropDown: () => void;
  logginOut: () => void;
}
const AppContext = React.createContext<AppContextValue>({
  profileId: "",
  menuShow: false,
  socket: io(),
  bar: "chats",
  user: null,
  activeChat: "",
  setBar: () => {},
  isDark: false,
  dropdown: false,
  profile: false,
  closeProfile: () => {},
  handleChat: () => {},
  toggleMenu: () => {},
  openProfile: () => {},
  handleMode: () => {},
  openDropDown: () => {},
  closeDropDown: () => {},
  logginOut: () => {},
});
export const useApp = (): AppContextValue => {
  return useContext(AppContext);
};
const AppLoader = () => {
  const [mode, setMode] = useState<"dark" | "light">(
    localStorageService.getMode() || "light"
  );
  const [dropdown, setDropDown] = useState<boolean>(false);
  const [activeChat, setActive] = useState<string>("");
  const handleChat = (id: string) => {
    setActive(id);
    if (menuShow) {
      setMenuShow(false);
    }
  };
  const logginOut = () => {
    dispatch(logOut());
  };
  const [bar, setBar] = useState<"users" | "chats" | null>("chats");
  const [menuShow, setMenuShow] = useState<boolean>(false);
  const toggleMenu = () => {
    setBar(null);
    setMenuShow((prev) => !prev);
  };
  const [profile, setProfile] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<string>("");
  const openProfile = (userId?: string) => {
    setProfile(true);
    if (userId) {
      setProfileId(userId);
    }
  };
  const closeProfile = () => {
    setProfile(false);
  };

  const openDropDown = () => {
    setDropDown(true);
  };
  const closeDropDown = () => {
    if (dropdown) {
      setDropDown(false);
    }
  };
  const handleMode = () => {
    localStorageService.setMode({ mode: mode === "dark" ? "light" : "dark" });
    setMode((prevState) => (prevState === "dark" ? "light" : "dark"));
  };
  const isLoggedIn = useSelector(getIsLoggedIn());
  const user = useSelector(getCurrentUser());
  useEffect(() => {
    if (isLoggedIn && !user) {
      dispatch(loadCurrentUser());
    }
    if (isLoggedIn && user) {
      dispatch(loadChats(user._id));
      socket = io(`${configFile.apiEndPoint}`);
      socket.emit("setup", user._id);
    }
  }, [isLoggedIn, user]);

  const dispatch = useAppDispatch();

  const contextValue: AppContextValue = {
    isDark: mode === "dark",
    socket,
    bar,
    setBar,
    profileId,
    user,
    menuShow,
    dropdown,
    profile,
    logginOut,
    activeChat,
    handleChat,
    openProfile,
    toggleMenu,
    handleMode,
    openDropDown,
    closeDropDown,
    closeProfile,
  };
  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </AppContext.Provider>
  );
};
export default AppLoader;
