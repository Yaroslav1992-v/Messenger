import React, { useState } from "react";
import { UserMinData } from "../../../store/types";
import { Avatar, Title, DotsBtn, DropDown } from "../../../componets/index";
import { useApp } from "../../../hooks/UseApp";
export const UserItem: React.FC<{ user: UserMinData }> = ({ user }) => {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const { openProfile } = useApp();
  const closeDropDown = () => {
    if (dropDown) {
      setDropDown(false);
    }
  };
  const toggleDropDown = () => {
    setDropDown((prev) => !prev);
  };
  const dropDownMenu = [
    {
      name: "New Chat",
      action: () => {},
    },
    {
      name: "Profile",
      action: () => openProfile(user._id),
    },
  ];
  return (
    <div onMouseLeave={closeDropDown} className="flex items-center relative  ">
      <div className="mr-5">
        <Avatar size="sm" image={user.image} />
      </div>
      <div className="mr-auto">
        <Title hType="h4" text={user.username} />
        {user.profession && (
          <span className="text-gray-400">{user.profession}</span>
        )}
      </div>
      <div className="actions opacity-0 transition duration-300 z-20 ease-in-out  ">
        <DotsBtn action={toggleDropDown} />
      </div>
      {dropDown && (
        <div
          className="absolute dropD hidden"
          style={{ right: "80px", bottom: "-23px" }}
        >
          <DropDown menu={dropDownMenu} />
        </div>
      )}
    </div>
  );
};
