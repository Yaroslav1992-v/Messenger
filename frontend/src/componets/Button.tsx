import clsx from "clsx";
import { ButtonProps } from "./componentTypes";

const Button: React.FC<ButtonProps> = ({ text, type = "button", disabled }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        "bg-blue-500 transition duration-300 ease-in-out",
        "text-white px-4 py-2 rounded-full w-full hover:bg-blue-700 focus:bg-blue-800",
        disabled && "disabled:opacity-50 cursor-not-allowed"
      )}
    >
      {text}
    </button>
  );
};

export default Button;
