import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser, loadCurrentUser } from "../../store/auth";
import { useAppDispatch } from "../../store/createStore";
import { Tab } from "./types";
import { EditForm } from "../Form/EditForm";
import { Loader } from "../Loader";
import { EditTabs } from "./EditTabs";

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
  return (
    <>
      <EditTabs action={handleTab} active={activeTab} />;
      {user && "social" in user ? (
        <EditForm tab={activeTab} user={user} />
      ) : (
        <Loader size={50} />
      )}
      ;
    </>
  );
};
