import React from "react";
import { Title, CloseBtn } from "../../../componets/index";

export const UserHeader = () => {
  return (
    <div className="w-full mb-6 px-6">
      <div className="flex justify-between w-full">
        <Title hType="h2" text="people" className="text-4xl" />
        <div>
          <CloseBtn action={() => {}} />
        </div>
      </div>
    </div>
  );
};
