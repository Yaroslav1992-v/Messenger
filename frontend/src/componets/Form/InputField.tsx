import clsx from "clsx";
import { ErrorMsg } from "./ErrorMsg";
import { InputFieldProps } from "./formTypes";

export const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  label,
  onChange,
  name,
  error,
  value,
}) => {
  return (
    <div className="col-span-2 mb-2">
      <div className="mb-2">
        <label
          htmlFor={name}
          className="block  mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
        >
          {label}
        </label>
        <input
          type="text"
          onChange={onChange}
          name={name}
          value={value}
          id={name}
          className={clsx(
            "bg-gray-50 border   text-gray-900 text-sm rounded-lg",
            " focus:outline-blue-500 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600",
            " dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500",
            " dark:focus:border-primary-500",
            error ? "border-red-600 mb-2" : "border-gray-300"
          )}
          placeholder={placeholder}
        />
      </div>
      {error && <ErrorMsg text={error} />}
    </div>
  );
};
