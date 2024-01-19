import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getChats } from "../../store/chat";
import { ChatsHeader } from "./components/ChatsHeader";
import clsx from "clsx";
import { useApp } from "../../hooks/UseApp";
import { ChatList } from "./components/ChatList";
import { useAppDispatch } from "../../store/createStore";
import { countUnread } from "../../store/message";

export const Chats = () => {
  const chats = useSelector(getChats());
  const { isDark } = useApp();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (chats.length > 0) {
      const ids = chats.map((c) => c._id);
      dispatch(countUnread(ids));
    }
  }, [chats]);
  return (
    <div
      className={clsx(
        "py-6    w-full h-full border-r    ",
        isDark ? "border-gray-700" : "border-gray-200  "
      )}
    >
      <ChatsHeader isDark={isDark} />
      {chats.length > 0 && (
        <div className="pt-8   z-20 h-screen  scrollbar-w-1  scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200 overflow-x-hidden  overflow-auto">
          <ChatList chats={chats} />
        </div>
      )}
    </div>
  );
};
