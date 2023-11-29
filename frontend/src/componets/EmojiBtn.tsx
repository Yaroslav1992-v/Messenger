import React from "react";
import { GrEmoji } from "react-icons/gr";

export const EmojiBtn = () => {
  return (
    <button
      type="button"
      className="p-2 rounded-lg cursor-pointer  text-yellow-400 hover:text-yellow-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
    >
      <GrEmoji size={30} />
      <span className="sr-only">Add emoji</span>
    </button>
  );
};
