import React from "react";
import { Title, CloseBtn, IconBtn } from "../../index";
import { MdOutlineGroup } from "react-icons/md";
import { bluePrimary } from "../../../colors/colors";
export const ChatsHeader: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className="w-full mb-6 px-6">
      <div className="flex justify-between w-full">
        <Title hType="h2" text="chats" className="text-4xl" />
        <div className="flex items-center">
          <IconBtn
            hoverText="New Group"
            isDark={isDark}
            Icon={<MdOutlineGroup size={25} color={bluePrimary} />}
            action={() => {}}
          />
          <CloseBtn action={() => {}} />
        </div>
      </div>
    </div>
  );
};
