import React from "react";
import { useSelector } from "react-redux";
import { getChats } from "../../store/chat";
import { ChatsHeader } from "./components/ChatsHeader";
import clsx from "clsx";
import { useApp } from "../../hooks/UseApp";
import { ChatList } from "./components/ChatList";

export const Chats = () => {
  const chats = useSelector(getChats());
  const { isDark } = useApp();
  return (
    <div
      className={clsx(
        "py-6  w-ds   border-r",
        isDark ? "border-gray-700" : "border-gray-200"
      )}
    >
      <ChatsHeader isDark={isDark} />
      <div className="pt-8">
        <ChatList chats={chats} />
      </div>
    </div>
  );
};
