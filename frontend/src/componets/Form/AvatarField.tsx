import React from "react";
import { Avatar } from "../Avatar";
import { AvatarFieldProps } from "./formTypes";
import { ErrorMsg } from "./ErrorMsg";

export const AvatarField: React.FC<AvatarFieldProps> = ({
  image,
  onChange,
  error,
}) => {
  return (
    <div className="mb-2">
      <div className="flex items-end mb-2">
        <div className="mr-2">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Avatar
          </label>
          <Avatar image={image} size="sm" />
        </div>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          onChange={onChange}
          type="file"
        />
      </div>
      {error && <ErrorMsg text={error} />}
    </div>
  );
};
