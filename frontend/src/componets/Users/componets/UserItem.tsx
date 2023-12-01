import React, { useState } from "react";
import { CreateChatData, UserMinData } from "../../../store/types";
import { DotsBtn, DropDown, ItemPreview } from "../../../componets/index";
import { useApp } from "../../../hooks/UseApp";
import { useAppDispatch } from "../../../store/createStore";
import { createChat } from "../../../store/chat";
export const UserItem: React.FC<{ user: UserMinData }> = ({ user }) => {
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
  const dispatch = useAppDispatch();
  const createNewChat = async () => {
    if (currentUser) {
      const newChat: CreateChatData = {
        users: [currentUser?._id, user._id],
        isGroup: false,
      };
      const chatId = await dispatch(createChat(newChat));
      if (chatId) {
        handleChat(chatId);
      }
    }
  };
  const dropDownMenu = [
    {
      name: "New Chat",
      action: createNewChat,
    },
    {
      name: "Profile",
      action: () => openProfile(user._id),
    },
  ];
  return (
    <div onMouseLeave={closeDropDown} className="flex items-center relative  ">
      <ItemPreview text={user.username} image={user.image}>
        {user.profession && (
          <span className="text-gray-400">{user.profession}</span>
        )}
      </ItemPreview>

      <div className="actions opacity-0 transition duration-300  p-5 ease-in-out absolute right-0  z-30 ">
        <DotsBtn action={toggleDropDown} />
      </div>
      {dropDown && (
        <div
          className="absolute z-20 dropD hidden"
          style={{ right: 0, top: "40px" }}
        >
          <DropDown menu={dropDownMenu} />
        </div>
      )}
    </div>
  );
};
