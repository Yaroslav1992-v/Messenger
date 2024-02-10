import React, { useEffect } from "react";

import { ChatHeader } from "./components/ChatHeader";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/auth";
import { MessageForm } from "../Form/MessageForm";
import { ChatBody } from "./components/ChatBody";
import { useApp } from "../../hooks/UseApp";
import clsx from "clsx";
import { useAppDispatch } from "../../store/createStore";
import { getMessages, loadMessages, recivedMessage } from "../../store/message";
import { groupMessagesByDate } from "../../utils/helpers";
import { getChat, getNewestChatId, loadChatById } from "../../store/chat";
import { Message } from "../../store/types";
export const Chat = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const { isDark, activeChat, handleChat, socket } = useApp();
  const messages = useSelector(getMessages());
  const newestChatId = useSelector(getNewestChatId());
  const chat = useSelector(getChat());
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (chat) {
      socket.off("message");
      socket.off("new-message");
      socket.emit("join", chat._id);
      socket.on("new-message", (newMessage: Message) => {
        if (newMessage.chatId === chat._id) {
          dispatch(recivedMessage(newMessage));
        }
      });
    }
    if (activeChat && chat) {
      dispatch(loadMessages(activeChat));
    }
    if (!activeChat && newestChatId && !chat) {
      handleChat(newestChatId);
    }
    if (activeChat && activeChat !== chat?._id) {
      dispatch(loadChatById(activeChat));
    }
  }, [activeChat, newestChatId, chat]);

  const user = chat ? chat.users.find((u) => u._id !== currentUserId) : null;
  const groupedMessages = groupMessagesByDate(messages);

  if (chat && user) {
    return (
      <div className="w-full flex flex-col h-full">
        <ChatHeader
          chatId={chat._id}
          info={!chat.isGroup ? user._id : true}
          name={!chat.isGroup ? user?.username : chat.name}
          image={!chat.isGroup ? user?.image : chat.image}
        />
        {currentUserId && (
          <ChatBody
            chatId={chat._id}
            messages={groupedMessages}
            userId={currentUserId}
          />
        )}
        <div
          className={clsx(
            "pt-2 px-2 border-t md:pt-3 md:px-8",
            isDark ? "border-gray-700" : "border-gray-200"
          )}
        >
          {currentUserId && <MessageForm chat={chat} userId={currentUserId} />}
        </div>
      </div>
    );
  } else
    return (
      <div className="text-xl d-flex items-center justify-center text-gray-500 m-auto">
        Use search to find users to start a chat
      </div>
    );
};
