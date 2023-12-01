import { Route, Routes } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/createStore";
import React from "react";
import localStorageService from "../service/localStorageService";
import Home from "../pages/Home/Home";
import { getCurrentUser, getIsLoggedIn, loadCurrentUser } from "../store/auth";
import { UserMinData } from "./../store/types";
import { loadChats } from "../store/chat";

export interface AppContextValue {
  profileId: string;
  isDark: boolean;
  profile: boolean;
  dropdown: boolean;
  user: UserMinData | null;
  handleMode: () => void;
  handleChat: (id: string) => void;
  activeChat: string;
  openDropDown: () => void;
  openProfile: (userId?: string) => void;
  closeProfile: () => void;
  closeDropDown: () => void;
}
const AppContext = React.createContext<AppContextValue>({
  profileId: "",
  user: null,
  activeChat: "",
  isDark: false,
  dropdown: false,
  profile: false,
  closeProfile: () => {},
  handleChat: () => {},
  openProfile: () => {},
  handleMode: () => {},
  openDropDown: () => {},
  closeDropDown: () => {},
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
    }
  }, [isLoggedIn, user]);
  const dispatch = useAppDispatch();

  const contextValue: AppContextValue = {
    isDark: mode === "dark",
    profileId,
    user,
    dropdown,
    profile,
    activeChat,
    handleChat,
    openProfile,
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
