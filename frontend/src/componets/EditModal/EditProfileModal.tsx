import React, { useEffect, useRef, useState } from "react";
import { useApp } from "../../hooks/UseApp";
import EditHeader from "./EditHeader";
import { Tab } from "./types";
import { EditTabs } from "./EditTabs";
import { EditForm, Loader } from "../index";
import { useSelector } from "react-redux";
import { getCurrentUser, loadCurrentUser } from "../../store/auth";
import { useAppDispatch } from "../../store/createStore";

export const EditProfileModal = () => {
  const { closeModal } = useApp();
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    console.log(e);
    if (e.target === ref.current) {
      closeModal();
    }
  };
  const dispatch = useAppDispatch();
  const user = useSelector(getCurrentUser());
  useEffect(() => {
    if (!user || (user && !("social" in user))) {
      dispatch(loadCurrentUser(false));
    }
  }, [user]);
  const [activeTab, setActiveTab] = useState<Tab>("personal");
  const handleTab = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      onClick={handleClick}
      className={`fixed  bg-transparent inset-0 overflow-y-auto  z-10  ${"block"}`}
      id="crud-modal"
    >
      <div ref={ref} className="flex items-center justify-center min-h-screen">
        <div className="relative p-4 w-full max-w-md max-h-full opacity-100">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <EditHeader close={closeModal} />
            <EditTabs action={handleTab} active={activeTab} />
            {user && "social" in user ? (
              <EditForm tab={activeTab} user={user} />
            ) : (
              <Loader size={50} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
