import React from "react";
import { SocialInputProps } from "./formTypes";

export const SocialInput: React.FC<SocialInputProps> = ({
  placeholder,
  name,
  value,
  Icon,
  onChange,
}) => {
  return (
    <div className="col-span-2 mb-2 flex">
      <input
        type="text"
        onChange={onChange}
        name={name}
        value={value}
        className="bg-gray-50 border h-8 capitalize border-gray-300 text-gray-900 text-sm    focus:outline-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        placeholder={placeholder}
      />
      {Icon}
    </div>
  );
};
