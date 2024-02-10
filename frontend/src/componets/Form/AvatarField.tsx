import React from "react";
import { Avatar } from "../Avatar";
import { AvatarFieldProps } from "./formTypes";
import { ErrorMsg } from "./ErrorMsg";
import { useApp } from "../../hooks/UseApp";
import clsx from "clsx";

export const AvatarField: React.FC<AvatarFieldProps> = ({
  image,
  onChange,
  error,
  label,
}) => {
  const { isDark } = useApp();
  return (
    <div className="mb-2">
      <div className="flex items-end mb-2">
        <div className="mr-2">
          <label
            className={clsx(
              "block mb-2 text-sm font-medium   w-full whitespace-nowrap",
              isDark ? "text-white" : "text-gray-900"
            )}
            htmlFor="file_input"
          >
            {label}
          </label>
          <Avatar image={image} size="sm" />
        </div>
        <input
          className={clsx(
            "block w-full text-sm border border-gray-300",
            "rounded-lg cursor-pointer bg-gray-50   focus:outline-none ",
            isDark ? "text-white" : "text-gray-700 "
          )}
          id="file_input"
          onChange={onChange}
          type="file"
        />
      </div>
      {error && <ErrorMsg text={error} />}
    </div>
  );
};
