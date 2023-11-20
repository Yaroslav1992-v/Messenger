import { ButtonProps } from "./componentTypes";

const Button: React.FC<ButtonProps> = ({ text, type = "button" }) => {
  return (
    <button
      type={type}
      className="bg-blue-500 transition duration-300 ease-in-out text-white px-4 py-2 rounded-full w-full hover:bg-blue-700 focus:bg-blue-800"
    >
      {text}
    </button>
  );
};

export default Button;
