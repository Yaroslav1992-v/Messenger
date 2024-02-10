import React, { useEffect, useRef, useState } from "react";
import {
  ChatOrGroupChat,
  Message,
  UndreadCount,
  UserMinData,
} from "../../../store/types";
import { ItemPreview } from "../../ItemPreview";
import { useApp } from "../../../hooks/UseApp";
import { DotsBtn } from "../../buttons/DotsBtn";
import { DropDown, Typing } from "../..";
import { formatDate } from "../../../utils/helpers";
import { cutString } from "./../../../utils/helpers";
import clsx from "clsx";
import { leaveChat, updateChat } from "../../../store/chat";
import { useAppDispatch } from "../../../store/createStore";
import localStorageService from "../../../service/localStorageService";

export const ChatItem: React.FC<{
  chat: ChatOrGroupChat;
  unread?: UndreadCount;
}> = ({ chat, unread }) => {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: any) => {
    openChat();
  };

  const [typing, setTyping] = useState<string | null>(null);
  const {
    openProfile,
    user: currentUser,
    handleChat,
    socket,
    isDark,
    activeChat,
  } = useApp();

  const toggleDropDown = () => {
    setDropDown((prev) => !prev);
  };
  const dispatch = useAppDispatch();
  const user = chat.users.find((u) => u._id !== currentUser?._id);
  const leave = () => {
    const chatId = localStorageService.getChat();
    if (currentUser) {
      if (chatId === chat._id && chat._id === activeChat) {
        handleChat("");
      }
      dispatch(leaveChat(currentUser._id, chat._id));
    }
  };
  const openChat = () => {
    handleChat(chat._id);
  };
  const openUser = () => {
    if (user) {
      openProfile(user._id);
    }
  };
  const dropDownMenu = chat.isGroup
    ? [
        {
          name: "Open",
          action: openChat,
        },

        {
          name: "Delete",
          action: leave,
          last: true,
        },
      ]
    : [
        {
          name: "Open",
          action: openChat,
        },
        {
          name: "Profile",
          action: openUser,
        },
        {
          name: "Delete",
          action: leave,
          last: true,
        },
      ];
  useEffect(() => {
    if (socket) {
      socket.off("new-message");
      socket.on("new-message", (newMessage: Message) => {
        dispatch(updateChat(newMessage));
      });
      socket.on("typing", (data: { chatId: string; user: UserMinData }) => {
        if (data.chatId === chat._id) {
          setTyping(data.user.username);
        }
      });
      socket.on("stop-typing", (id) => {
        if (id === chat._id) {
          setTyping(null);
        }
      });
    }
  }, [socket]);

  return (
    <div
      className={clsx(
        "flex items-center relative justify-between py-4  rounded-sm  px-6",
        unread?.count &&
          unread.count > 0 &&
          (isDark ? "bg-gray-800" : "bg-gray-200"),
        activeChat === chat._id && (isDark ? "bg-gray-800" : "bg-gray-200")
      )}
    >
      {user && (
        <div ref={divRef} onClick={handleClick} className="w-full">
          <ItemPreview
            text={chat.isGroup ? chat.name : user.username}
            image={chat.isGroup ? chat.image : user.image}
          >
            {typing && (
              <div className="flex  relative justify-items-start items-center">
                <Typing size={chat.isGroup ? 4 : 6} />
                {chat.isGroup && (
                  <p className="absolute   left-8 whitespace-nowrap  text-gray-500 text-sm font-bold">{` ${cutString(
                    typing,
                    12
                  )} is typing`}</p>
                )}
              </div>
            )}
            {chat.lastMessage && !typing && (
              <div onClick={handleClick} className="text-gray-400 ">
                {chat.lastMessage.image ? (
                  <div className="h-8 w-8 rounded-md">
                    <img
                      className="w-full h-full rounded-md"
                      src={chat.lastMessage.image}
                      alt="message"
                    />
                  </div>
                ) : (
                  <p>{cutString(chat.lastMessage.text || "", 150)}</p>
                )}
              </div>
            )}
          </ItemPreview>
        </div>
      )}
      <div className="relative flex  mb-auto">
        <div className="text-xs text-gray-400 font-thin    whitespace-nowrap">
          {formatDate(chat.updatedAt)}
        </div>
        <div className="actions top-0  opacity-0  transition duration-300  p-5 ease-in-out absolute right-0  z-10 ">
          <DotsBtn action={toggleDropDown} />
        </div>
        {unread && unread.count > 0 && (
          <span
            style={{ left: "-10px" }}
            className={clsx(
              "absolute   top-5    h-6 w-6 text-sm justify-center p-1 font-medium rounded-full",
              " flex items-center bg-gray-400"
            )}
          >
            {unread.count}
          </span>
        )}
      </div>
      {dropDown && (
        <div
          className="absolute z-40 dropD hidden"
          style={{ right: "-50px", top: "0" }}
        >
          <DropDown menu={dropDownMenu} />
        </div>
      )}
    </div>
  );
};
