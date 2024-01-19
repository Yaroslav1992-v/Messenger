import React from "react";

import { ChatItem } from "./ChatItem";
import clsx from "clsx";
import { useApp } from "../../../hooks/UseApp";
import { ChatOrGroupChat } from "../../../store/types";
import { useSelector } from "react-redux";
import { getUnread } from "../../../store/message";

export const ChatList: React.FC<{ chats: ChatOrGroupChat[] }> = ({ chats }) => {
  const { isDark } = useApp();
  const unread = useSelector(getUnread());
  const findUnread = (id: string) => unread.find((u) => u.chatId === id);
  return (
    <ul>
      {chats.map((c) => (
        <li
          className={clsx(
            "   z-20   border-b  cursor-pointer user-item  rounded-sm   not-last-child:mb-5",
            isDark ? "border-gray-700" : "border-gray-200"
          )}
          key={c._id}
        >
          <ChatItem unread={findUnread(c._id)} chat={c} />
        </li>
      ))}
    </ul>
  );
};
