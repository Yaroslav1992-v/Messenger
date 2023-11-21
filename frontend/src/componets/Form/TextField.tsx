import clsx from "clsx";
import { TextFieldProps } from "./formTypes";
import { ErrorMsg } from "./ErrorMsg";

const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  type,
  onChange,
  name,
  error,
}) => {
  return (
    <div className="mb-4">
      <input
        name={name}
        onChange={onChange}
        type={type}
        className={clsx(
          `w-full px-3 py-2 border  rounded-md focus:outline-blue-500`,
          error ? "border-red-500 mb-2" : "border-gray-300"
        )}
        placeholder={placeholder}
      />
      {error && <ErrorMsg text={error} />}
    </div>
  );
};

export default TextField;
