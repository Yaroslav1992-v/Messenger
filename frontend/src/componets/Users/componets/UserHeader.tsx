import React from "react";
import { Title, CloseBtn } from "../../../componets/index";
import { useApp } from "../../../hooks/UseApp";

export const UserHeader = () => {
  const { toggleMenu } = useApp();
  return (
    <div className="w-full mb-6 px-6">
      <div className="flex justify-between w-full">
        <Title hType="h2" text="people" className="text-4xl" />
        <div className="block lg:hidden">
          <CloseBtn action={toggleMenu} />
        </div>
      </div>
    </div>
  );
};
