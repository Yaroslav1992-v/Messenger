import React, { useEffect, useState } from "react";
import { ChatHeaderProps } from "../chatProps";
import { IconBtn, DropDown, ItemPreview, Modal, Typing } from "../../index";
import { GiHamburgerMenu } from "react-icons/gi";
import { useApp } from "../../../hooks/UseApp";
import clsx from "clsx";
import { IoIosCall } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { CiSettings } from "react-icons/ci";
import { ChatSettingsModal } from "../../Modal/ChatSettingsModal";
import { white } from "../../../colors/colors";
import { UserMinData } from "../../../store/types";
import { cutString } from "../../../utils/helpers";
export const ChatHeader: React.FC<ChatHeaderProps> = ({
  name,
  image,
  info,
  chatId,
}) => {
  const { isDark, socket } = useApp();
  const { openProfile, toggleMenu } = useApp();
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [typing, setTyping] = useState<string | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const toggleModal = () => {
    setModal((prev) => !prev);
  };
  useEffect(() => {
    if (socket) {
      socket.on("typing", (data: { chatId: string; user: UserMinData }) => {
        if (data.chatId === chatId) {
          setTyping(data.user.username);
        }
      });
      socket.on("stop-typing", (id) => {
        if (id === chatId) {
          setTyping(null);
        }
      });
    }
  }, []);
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
          "p-8 flex flex-wrap items-center   z-10  border-b w-full justify-between",
          isDark ? "border-gray-700" : "border-gray-200"
        )}
      >
        <ItemPreview text={name} image={image}>
          {typing ? (
            <div className="flex  relative justify-items-start items-center">
              <Typing size={info ? 4 : 6} />
              {typeof info === "boolean" && (
                <p className="absolute   left-8 whitespace-nowrap  text-gray-500 text-sm font-bold">{` ${cutString(
                  typing,
                  12
                )} is typing`}</p>
              )}
            </div>
          ) : (
            <span className="font-medium text-green-500">Online</span>
          )}
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
          <div className="lg:hidden block">
            <IconBtn
              name="Bugrger Menu"
              isDark={isDark}
              action={toggleMenu}
              Icon={<GiHamburgerMenu size={25} className="text-gray-600" />}
            />
          </div>
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
