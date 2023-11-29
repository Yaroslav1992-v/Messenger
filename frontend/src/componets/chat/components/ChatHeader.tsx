import React, { useState } from "react";
import { ChatHeaderProps } from "../chatProps";
import { Title, Avatar, IconBtn, DropDown, UserPreview } from "../../index";
import { useApp } from "../../../hooks/UseApp";
import clsx from "clsx";
import { IoIosCall } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
export const ChatHeader: React.FC<ChatHeaderProps> = ({ name, image, _id }) => {
  const { openProfile } = useApp();
  const [dropDown, setDropDown] = useState<boolean>(false);
  const dropDownMenu = [
    {
      name: "Profile",
      action: () => openProfile(_id),
    },
    {
      name: "Delete",
      action: () => openProfile(_id),
      last: true,
    },
  ];
  const toggleDropDown = () => {
    setDropDown((prev) => !prev);
  };
  const closeDropDown = () => {
    if (dropDown) {
      setDropDown(false);
    }
  };
  const { isDark } = useApp();
  const actions = [
    {
      Icon: <IoIosCall size={25} className="text-green-400" />,
      action: () => {},
      name: "Phone Call",
    },
    {
      Icon: <FaVideo size={25} className="text-yellow-400" />,
      action: () => {},
      name: "Video Call",
    },
    {
      Icon: <HiOutlineDotsHorizontal size={25} className="text-gray-600" />,
      action: toggleDropDown,
    },
  ];
  return (
    <div
      onMouseLeave={closeDropDown}
      className={clsx(
        "p-8 flex items-center   border-b w-full justify-between",
        isDark ? "border-gray-700" : "border-gray-200"
      )}
    >
      <UserPreview text={name} image={image}>
        <span className="font-medium text-green-500">writing...</span>
      </UserPreview>
      <div className="flex relative">
        {actions.map((a, i) => (
          <IconBtn
            name={a.name || ""}
            isDark={isDark}
            key={i}
            action={a.action}
            Icon={a.Icon}
          />
        ))}
        <div
          style={{ top: " 53px", right: "-25px" }}
          className="top-0 absolute"
        >
          {dropDown && <DropDown menu={dropDownMenu} />}
        </div>
      </div>
    </div>
  );
};
