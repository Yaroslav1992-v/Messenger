import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export const CloseBtn: React.FC<{ action: (str?: string) => void }> = ({
  action,
}) => {
  const click = () => {
    action();
  };
  return (
    <button
      onClick={click}
      className="p-2 border border-gray-300 rounded  transition duration-300
         hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
    >
      <AiOutlineClose size={20} className="text-red-600" />
    </button>
  );
};
