import { TextFieldProps } from "./formTypes";

const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  type,
  onChange,
  name,
}) => {
  return (
    <div className="mb-4">
      <input
        onChange={onChange}
        type={type}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextField;
