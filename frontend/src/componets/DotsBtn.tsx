import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
export const DotsBtn: React.FC<{ action: () => void }> = ({ action }) => {
  return (
    <button onClick={action} className="cursor-pointer">
      <HiOutlineDotsHorizontal size={30} className="text-gray-600" />
    </button>
  );
};
