import React from "react";

import { ChatItem } from "./ChatItem";
import clsx from "clsx";
import { useApp } from "../../../hooks/UseApp";
import { ChatOrGroupChat } from "../../../store/types";

export const ChatList: React.FC<{ chats: ChatOrGroupChat[] }> = ({ chats }) => {
  const { isDark } = useApp();
  return (
    <ul>
      {chats.map((c) => (
        <li
          className={clsx(
            "mb-5 py-4 z-20  px-6 border-b  cursor-pointer user-item",
            isDark ? "border-gray-700" : "border-gray-200"
          )}
          key={c._id}
        >
          <ChatItem chat={c} />
        </li>
      ))}
    </ul>
  );
};
