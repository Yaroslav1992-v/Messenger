import React from "react";
import { useApp } from "../../hooks/UseApp";
import { MessageAreaProps } from "./formTypes";
import clsx from "clsx";

export const MessageArea: React.FC<MessageAreaProps> = ({
  onChange,
  value,
}) => {
  const { isDark } = useApp();
  return (
    <div className="flex flex-col w-full">
      <textarea
        value={value}
        onChange={onChange}
        name="text"
        id="chat"
        className={clsx(
          "block   p-2.5  text-sm   rounded-lg border",
          isDark
            ? "bg-primary border-gray-700 text-gray-300"
            : "bg-white focus:outline-blue-500   text-gray-900 border-gray-200"
        )}
        placeholder="Your message..."
      ></textarea>
    </div>
  );
};
