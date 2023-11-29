import React from "react";
import { IconBtnProps } from "./componentTypes";
import clsx from "clsx";

export const IconBtn: React.FC<IconBtnProps> = ({ Icon, isDark, action }) => {
  return (
    <div className="relative h-auto w-auto icon-btn">
      <button
        onClick={action}
        className={clsx(
          "p-2 border mr-5 rounded",
          "transition duration-300 hover:bg-gray-100",
          " focus:outline-none focus:ring focus:border-blue-300",
          isDark ? "border-gray-700" : "border-gray-200"
        )}
      >
        {Icon}
      </button>
    </div>
  );
};
