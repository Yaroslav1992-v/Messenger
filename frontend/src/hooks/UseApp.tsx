import { Route, Routes } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/createStore";
import React from "react";
import localStorageService from "../service/localStorageService";
import Home from "../pages/Home/Home";
import Users from "../pages/Users/Users";
import { getCurrentUser, getIsLoggedIn, loadCurrentUser } from "../store/auth";
import { UserMinData } from "./../store/types";

export interface AppContextValue {
  profileId: string;
  isDark: boolean;
  modal: boolean;
  profile: boolean;
  dropdown: boolean;
  user: UserMinData | null;
  handleMode: () => void;
  openModal: () => void;
  closeModal: () => void;
  openDropDown: () => void;
  openProfile: (userId?: string) => void;
  closeProfile: () => void;
  closeDropDown: () => void;
}
const AppContext = React.createContext<AppContextValue>({
  profileId: "",
  user: null,
  isDark: false,
  modal: false,
  dropdown: false,
  profile: false,
  closeProfile: () => {},
  openProfile: () => {},
  handleMode: () => {},
  openModal: () => {},
  closeModal: () => {},
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
  const [modal, setModal] = useState<boolean>(false);
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
  const openModal = () => {
    setModal(true);
    closeDropDown();
  };
  const closeModal = () => {
    setModal(false);
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
  }, [isLoggedIn]);
  const dispatch = useAppDispatch();

  const contextValue: AppContextValue = {
    isDark: mode === "dark",
    modal,
    profileId,
    user,
    dropdown,
    profile,
    openProfile,
    handleMode,
    openDropDown,
    closeDropDown,
    closeProfile,
    openModal,
    closeModal,
  };
  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </AppContext.Provider>
  );
};
export default AppLoader;
