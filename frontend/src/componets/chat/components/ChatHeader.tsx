import React, { useState } from "react";
import { ChatHeaderProps } from "../chatProps";
import { IconBtn, DropDown, ItemPreview, Modal } from "../../index";
import { useApp } from "../../../hooks/UseApp";
import clsx from "clsx";
import { IoIosCall } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { CiSettings } from "react-icons/ci";
import { ChatSettingsModal } from "../../Modal/ChatSettingsModal";
import { white } from "../../../colors/colors";
export const ChatHeader: React.FC<ChatHeaderProps> = ({
  name,
  image,
  info,
}) => {
  const { openProfile } = useApp();
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const toggleModal = () => {
    setModal((prev) => !prev);
  };
  const dropDownMenu =
    typeof info !== "string"
      ? [
          {
            name: "Settings",
            action: toggleModal,
          },
          {
            name: "Leave",
            action: () => {},
            last: true,
          },
        ]
      : [
          {
            name: "Profile",
            action: () => openProfile(info),
          },
          {
            name: "Delete",
            action: () => openProfile(info),
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
  const actions =
    typeof info === "string"
      ? [
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
            Icon: (
              <HiOutlineDotsHorizontal size={25} className="text-gray-600" />
            ),
            action: toggleDropDown,
          },
        ]
      : [
          {
            Icon: (
              <HiOutlineDotsHorizontal size={25} className="text-gray-600" />
            ),
            action: toggleDropDown,
          },
        ];
  return (
    <>
      <div
        onMouseLeave={closeDropDown}
        className={clsx(
          "p-8 flex items-center   border-b w-full justify-between",
          isDark ? "border-gray-700" : "border-gray-200"
        )}
      >
        <ItemPreview text={name} image={image}>
          <span className="font-medium text-green-500">writing...</span>
        </ItemPreview>
        <div className="flex relative">
          {actions.map((a, i) => (
            <IconBtn
              name={a.name || ""}
              isDark={isDark}
              key={i}
              hoverText={a.name || ""}
              action={a.action}
              Icon={a.Icon}
            />
          ))}
          <div
            style={{ top: "15px", right: "-25px" }}
            className="top-0 absolute"
          >
            {dropDown && <DropDown menu={dropDownMenu} />}
          </div>
        </div>
      </div>
      {modal && (
        <Modal
          close={toggleModal}
          Icon={<CiSettings className="mr-1" color={white} size={20} />}
          modalName="Settings"
        >
          <ChatSettingsModal />
        </Modal>
      )}
    </>
  );
};
