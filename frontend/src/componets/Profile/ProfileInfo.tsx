import React from "react";
import { UserData } from "../../store/types";
import { Avatar } from "../Avatar";
import { useApp } from "../../hooks/UseApp";
import clsx from "clsx";
import { Title } from "../Title";

export const ProfileInfo: React.FC<{ user: UserData }> = ({ user }) => {
  const { isDark } = useApp();
  return (
    <div className="w-full flex flex-col items-center mb-4">
      <div className="mb-8">
        <Avatar size="large" image={user.image || ""} />
      </div>
      <Title text={user.username} className="text-3xl" hType="h4" />
      <span className="text-sm font-medium text-gray-400">Last Seen Today</span>
    </div>
  );
};
