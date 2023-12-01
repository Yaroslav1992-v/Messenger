import { IoClose } from "react-icons/io5";

import { white } from "../../colors/colors";
const ModalHeader: React.FC<{
  close: () => void;
  title: string;
  Icon: JSX.Element;
}> = ({ close, title, Icon }) => {
  return (
    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 bg-blue-500">
      <div className="flex items-center">
        {Icon}
        <h3 className="text-lg text-white font-semibold   ">{title}</h3>
      </div>
      <button
        onClick={close}
        type="button"
        className="text-gray-400 bg-transparent hover:bg-gray-400 hover:text-gray-900 rounded-full   text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <IoClose color={white} size={30} />
        <span className="sr-only">Close modal</span>
      </button>
    </div>
  );
};

export default ModalHeader;
