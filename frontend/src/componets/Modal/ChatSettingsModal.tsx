import React, { useState } from "react";
import { ModalTabs } from "./ModalTabs";
import { useSelector } from "react-redux";
import { getChat } from "../../store/chat";
import { GroupForm } from "../Form/GroupForm";
import { UserListSmall } from "../Users/componets/UserListSmall";
import { ChatInfo } from "../chat/components/ChatInfo";
import { getCurrentUserId } from "../../store/auth";

export const ChatSettingsModal = () => {
  type Tab = "users" | "edit" | "info";
  const tabs: Tab[] = ["users", "info"];
  const userdId = useSelector(getCurrentUserId());
  const chat = useSelector(getChat());
  const adminTabs: Tab[] = ["users", "edit", "info"];
  const check = chat && "admin" in chat && userdId === chat.admin;
  const [activeTab, setActiveTab] = useState<Tab>(check ? "edit" : "users");
  const handleTab = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <ModalTabs<Tab>
        tabs={check ? adminTabs : tabs}
        action={handleTab}
        active={activeTab}
      />
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
