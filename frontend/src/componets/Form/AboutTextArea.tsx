import React from "react";
import { InputFieldProps } from "./formTypes";
import { useApp } from "../../hooks/UseApp";
import clsx from "clsx";

export const AboutTextArea: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  placeholder,
  onChange,
}) => {
  const { isDark } = useApp();
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className={clsx(
          "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
          isDark ? "text-white" : "text-gray-900"
        )}
      >
        {label}
      </label>
      <textarea
        id={name}
        onChange={onChange}
        value={value}
        rows={3}
        name={name}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};
