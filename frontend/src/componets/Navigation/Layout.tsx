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

export const Layout: React.FC<{ children: JSX.Element }> = ({ children }) => {
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
      className={clsx(
        `layout h-screen flex    w-full `,
        isDark && "bg-primary"
      )}
    >
      {modal && (
        <div
          className={clsx(
            "absolute inset-y-0 inset-x-0 bg-black z-10 opacity-70"
          )}
        ></div>
      )}
      <nav
        className={clsx(
          "menu  flex flex-col items-center max-w-[100px] py-6 w-full h-full border-r",
          isDark ? "border-gray-700" : "border-gray-200"
        )}
      >
        <Logo size="sm" />
        <Menu />
        {user && <NavBottom userId={user?._id} />}
      </nav>
      {modal && <EditProfileModal />}
      {user && profile && <Profile />}
      {children}
      <ToastContainer />
    </div>
  );
};
