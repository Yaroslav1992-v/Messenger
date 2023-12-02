import clsx from "clsx";
import { useApp } from "../../hooks/UseApp";
import Menu from "./Menu";
import { Modal, Users, Profile, Chats } from ".././index";
import { useEffect, useState } from "react";
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
  const { isDark, user, profile } = useApp();
  const [dropdown, setDropDown] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const toggleModal = () => {
    setModal((prev) => !prev);
  };
  const closeDropDown = () => {
    if (dropdown) {
      setDropDown(false);
    }
  };
  const [bar, setBar] = useState<"users" | "chats">("chats");
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
    <div
      onClick={closeDropDown}
      className={clsx(`flex  h-screen `, isDark && "bg-primary")}
    >
      <Menu close={toggleModal} menu={menu} />
      {bar === "users" ? <Users /> : <Chats />}

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

      <ToastContainer />
    </div>
  );
};
