import clsx from "clsx";
import { useApp } from "../../hooks/UseApp";
import Menu from "./Menu";
import { Modal, Users, Profile, Chats } from ".././index";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getAuthError, getAuthSuccess } from "../../store/auth";
import { showToastMessage } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { EditModal } from "../Modal/EditModal";
import { white } from "../../colors/colors";
export const Layout = () => {
  const { isDark, user, profile, menuShow, bar, setBar, toggleMenu } = useApp();
  const [dropdown, setDropDown] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const divRef = useRef(null);
  const toggleModal = () => {
    setModal((prev) => !prev);
  };
  const closeDropDown = (e: any) => {
    if (e.target === divRef.current) {
      if (!bar) {
        toggleMenu();
      }
    }
    if (dropdown) {
      setDropDown(false);
    }
  };

  const menu = [
    {
      to: () => setBar("chats"),
      active: bar === "chats",
      name: "chats",
      Icon: IoChatbubbleOutline,
    },
    {
      to: () => setBar("users"),
      active: bar === "users",
      name: "users",
      Icon: FiUser,
    },
  ];
  const authError = useSelector(getAuthError());
  const authSuccess = useSelector(getAuthSuccess());
  useEffect(() => {
    if (typeof authError === "string") {
      showToastMessage("error", authError);
    }
    if (authSuccess) {
      showToastMessage("success", authSuccess);
    }
  }, [authError, authSuccess]);

  return (
    <>
      <div
        ref={divRef}
        onClick={closeDropDown}
        className={clsx(
          `z-20 transition duration-300 ease-in-out overflow-y-hidden flex    absolute top-0 bottom-0 lg:relative  h-screen lg:translate-x-[0] max-w-lg w-full  `,
          isDark ? "bg-primary" : "bg-white",
          menuShow
            ? "translate-x-[0]  w-full max-w-full"
            : "translate-x-[-1500px]",
          !bar && "bg-opacity-40"
        )}
      >
        {<Menu close={toggleModal} menu={menu} />}
        {bar && (
          <div className="w-full">
            {bar === "users" ? <Users /> : bar === "chats" ? <Chats /> : ""}
          </div>
        )}

        <ToastContainer />
      </div>
      {modal && (
        <Modal
          Icon={
            <MdOutlineModeEditOutline
              className="mr-1"
              color={white}
              size={20}
            />
          }
          close={toggleModal}
          modalName="Edit Form"
        >
          <EditModal />
        </Modal>
      )}
      {user && profile && <Profile />}
    </>
  );
};
