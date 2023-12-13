import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser, loadCurrentUser } from "../../store/auth";
import { useAppDispatch } from "../../store/createStore";
import { EditForm } from "../Form/EditForm";
import { Loader } from "../Loader";
import { ModalTabs } from "./ModalTabs";

export const EditModal = () => {
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
  const tabs: Tab[] = ["personal", "about", "social"];
  type Tab = "personal" | "about" | "social";
  return (
    <>
      <ModalTabs<Tab> tabs={tabs} action={handleTab} active={activeTab} />
      {user && "social" in user ? (
        <EditForm tab={activeTab} user={user} />
      ) : (
        <Loader size={50} />
      )}
      ;
    </>
  );
};
