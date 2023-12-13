import React from "react";
import { FaImage } from "react-icons/fa";
import { AddImageFieldProps } from "./formTypes";
export const AddImageField: React.FC<AddImageFieldProps> = ({ onChange }) => {
  return (
    <label
      htmlFor="file"
      className="inline-flex justify-center p-2 text-blue-500 rounded-lg cursor-pointer hover:text-blue-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
    >
      <FaImage className="h-6 w-6 md:h-7  md:w-7" />
      <span className="sr-only">Upload image</span>
      <input
        onChange={onChange}
        id="file"
        type="file"
        className="absolute w-0 h-0 pointer-events-none"
      />
    </label>
  );
};
