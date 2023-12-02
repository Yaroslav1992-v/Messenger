import React, { useState } from "react";
import { ModalTabs } from "./ModalTabs";
import { useSelector } from "react-redux";
import { getChat } from "../../store/chat";
import { GroupForm } from "../Form/GroupForm";
import { UserListSmall } from "../Users/componets/UserListSmall";
import { ChatInfo } from "../chat/components/ChatInfo";

export const ChatSettingsModal = () => {
  type Tab = "users" | "edit" | "info";
  const tabs: Tab[] = ["users", "edit", "info"];
  const [activeTab, setActiveTab] = useState<Tab>("edit");
  const handleTab = (tab: Tab) => {
    setActiveTab(tab);
  };
  const chat = useSelector(getChat());
  return (
    <>
      <ModalTabs<Tab> tabs={tabs} action={handleTab} active={activeTab} />
      <div className="px-4 pb-4 flex flex-col    w-full">
        {activeTab === "edit" && chat && <GroupForm chat={chat} />}
        {activeTab === "users" && chat && (
          <UserListSmall
            users={chat.users}
            admin={"admin" in chat ? chat.admin : ""}
          />
        )}
        {activeTab === "info" && chat && "admin" in chat && (
          <ChatInfo chatName={chat.name} desc={chat.description} />
        )}
      </div>
    </>
  );
};
