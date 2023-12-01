import React, { useState } from "react";
import { Chat } from "../../../store/types";
import { ItemPreview } from "../../ItemPreview";
import { useApp } from "../../../hooks/UseApp";
import { DotsBtn } from "../../buttons/DotsBtn";
import { DropDown } from "../..";
import { formatDate } from "../../../utils/helpers";
import { cutString } from "./../../../utils/helpers";

export const ChatItem: React.FC<{ chat: Chat }> = ({ chat }) => {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const { openProfile, user: currentUser, handleChat } = useApp();
  const closeDropDown = () => {
    if (dropDown) {
      setDropDown(false);
    }
  };
  const toggleDropDown = () => {
    setDropDown((prev) => !prev);
  };
  const user = chat.users.find((u) => u._id !== currentUser?._id);
  const openChat = () => {
    handleChat(chat._id);
  };
  const openUser = () => {
    if (user) {
      openProfile(user._id);
    }
  };
  const dropDownMenu = [
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
      action: () => {},
      last: true,
    },
  ];

  return (
    <div
      onMouseLeave={closeDropDown}
      className="flex items-center relative justify-between  "
    >
      {user && (
        <ItemPreview text={user.username} image={user.image}>
          {chat.lastMessage && (
            <div className="text-gray-400">
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
      )}
      <div className="relative flex  mb-auto">
        <span className="text-xs text-gray-400 font-thin">
          {formatDate(chat.updatedAt)}
        </span>
        <div className="actions top-0  opacity-0  transition duration-300  p-5 ease-in-out absolute right-0  z-30 ">
          <DotsBtn action={toggleDropDown} />
        </div>
      </div>
      {dropDown && (
        <div
          className="absolute z-20 dropD hidden"
          style={{ right: "-50px", top: "0" }}
        >
          <DropDown menu={dropDownMenu} />
        </div>
      )}
    </div>
  );
};
