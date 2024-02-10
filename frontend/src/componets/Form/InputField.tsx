import clsx from "clsx";
import { ErrorMsg } from "./ErrorMsg";
import { InputFieldProps } from "./formTypes";
import { useApp } from "../../hooks/UseApp";

export const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  label,
  onChange,
  name,
  error,
  value,
}) => {
  const { isDark } = useApp();
  return (
    <div className="col-span-2 mb-2">
      <div className="mb-2">
        <label
          htmlFor={name}
          className={clsx(
            "block  mb-2 text-sm font-medium   dark:text-white capitalize",
            isDark ? "text-gray-200" : "text-gray-900"
          )}
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
            "bg-gray-50 border   text-sm rounded-lg",
            " focus:outline-blue-500 focus:border-primary-600 block w-full p-2.5",
            error ? "border-red-600 mb-2" : "border-gray-300",
            isDark
              ? "bg-primary border-gray-700 text-gray-200"
              : "bg-white focus:outline-blue-500   text-gray-900 border-gray-200"
          )}
          placeholder={placeholder}
        />
      </div>
      {error && <ErrorMsg text={error} />}
    </div>
  );
};
