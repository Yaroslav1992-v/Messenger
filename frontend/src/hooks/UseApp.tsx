import { Route, Routes } from "react-router-dom";

import { useContext, useState } from "react";
import {} from "react-redux";

import { useAppDispatch } from "../store/createStore";
import React from "react";
import localStorageService from "../service/localStorageService";
import Home from "../pages/Home/Home";
import Users from "../pages/Users/Users";

export interface AppContextValue {
  isDark: boolean;
  handleMode: () => void;
}
const AppContext = React.createContext<AppContextValue>({
  isDark: false,
  handleMode: () => {},
});
export const useApp = (): AppContextValue => {
  return useContext(AppContext);
};
const AppLoader = () => {
  const [mode, setMode] = useState<"dark" | "light">(
    localStorageService.getMode() || "light"
  );

  const handleMode = () => {
    localStorageService.setMode({ mode: mode === "dark" ? "light" : "dark" });
    setMode((prevState) => (prevState === "dark" ? "light" : "dark"));
  };
  const dispatch = useAppDispatch();

  const contextValue: AppContextValue = {
    isDark: mode === "dark",
    handleMode,
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
