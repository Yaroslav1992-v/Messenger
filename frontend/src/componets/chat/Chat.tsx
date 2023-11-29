import React, { useEffect, useState } from "react";
import { Chat as ChatData } from "../../store/types";
import { ChatHeader } from "./components/ChatHeader";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/auth";
import { MessageForm } from "../Form/MessageForm";
import { ChatBody } from "./components/ChatBody";
import { useApp } from "../../hooks/UseApp";
import clsx from "clsx";
import { useAppDispatch } from "../../store/createStore";
import { getMessages, loadMessages } from "../../store/message";
import { groupMessagesByDate } from "../../utils/helpers";
import { getChat, getNewestChatId, loadChatById } from "../../store/chat";
import { Modal } from "../Modal/Modal";
import { EditModal } from "../Modal/EditModal";

export const Chat = () => {
  const currentUserId = useSelector(getCurrentUserId());
  const [modal, setModal] = useState();
  const { isDark, activeChat, handleChat } = useApp();
  const messages = useSelector(getMessages());
  const newestChatId = useSelector(getNewestChatId());
  const chat = useSelector(getChat());
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!activeChat && newestChatId) {
      handleChat(newestChatId);
    }
    if (activeChat && activeChat !== chat?._id) {
      dispatch(loadChatById(activeChat));
    }
  }, [activeChat, newestChatId]);
  useEffect(() => {
    if (activeChat) {
      dispatch(loadMessages(activeChat));
    }
    if (!activeChat && newestChatId) {
      handleChat(newestChatId);
    }
    if (activeChat && activeChat !== chat?._id) {
      dispatch(loadChatById(activeChat));
    }
  }, [activeChat, chat?._id]);

  const user = chat ? chat.users.find((u) => u._id !== currentUserId) : null;
  const groupedMessages = groupMessagesByDate(messages);
  if (chat && user) {
    return (
      <div className="w-full flex flex-col h-full">
        <ChatHeader
          _id={user?._id || ""}
          name={!chat.isGroup ? user?.username || "" : ""}
          image={user?.image}
        />
        {currentUserId && groupedMessages.length > 0 && (
          <ChatBody
            chatId={chat._id}
            messages={groupedMessages}
            userId={currentUserId}
          />
        )}
        <div
          className={clsx(
            "pt-8 px-8 border-t",
            isDark ? "border-gray-700" : "border-gray-200"
          )}
        >
          {currentUserId && (
            <MessageForm chatId={chat._id} userId={currentUserId} />
          )}
        </div>
      </div>
    );
  } else return <div>Div</div>;
};
