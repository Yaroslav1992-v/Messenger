import { IoClose } from "react-icons/io5";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { white } from "../../colors/colors";
const ModalHeader: React.FC<{ close: () => void; title: string }> = ({
  close,
  title,
}) => {
  return (
    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 bg-blue-500">
      <div className="flex items-center">
        <MdOutlineModeEditOutline className="mr-1" color={white} size={20} />
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
