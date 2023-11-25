import clsx from "clsx";
import { useApp } from "../../hooks/UseApp";
import { Logo } from "../Logo";
import Menu from "./Menu";
import NavBottom from "./NavBottom";
import { EditProfileModal } from "../EditModal/EditProfileModal";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAuthError, getAuthSuccess } from "../../store/auth";
import { showToastMessage } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import { Profile } from "../index";

export const Layout = () => {
  const { isDark, modal, closeDropDown, user, profile } = useApp();
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
      className={clsx(`layout h-screen    w-full `, isDark && "bg-primary")}
    >
      <div
        className={clsx(
          "absolute inset-y-0 inset-x-0 bg-black ",
          modal ? "opacity-70 z-10" : "opacity-0 z-0 "
        )}
      ></div>
      <nav
        className={clsx(
          "menu z-20 flex flex-col items-center max-w-[100px] py-6 w-full h-full border-r",
          isDark ? "border-gray-700" : "border-gray-200"
        )}
      >
        <Logo size="sm" />
        <Menu />
        <NavBottom />
      </nav>
      {modal && <EditProfileModal />}
      {user && profile && <Profile userId={user?._id} />}
      <ToastContainer />
    </div>
  );
};
