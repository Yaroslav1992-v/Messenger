import { AiOutlineClose } from "react-icons/ai";
import { useApp } from "../../hooks/UseApp";
import { Title } from "../Title";
export const ProfileHeader = () => {
  const { toggleProfile } = useApp();
  return (
    <div className="flex w-full justify-between items-center  mb-14">
      <Title text="profile" className="text-4xl" hType="h2" />
      <button
        onClick={toggleProfile}
        className="p-2 border border-gray-300 rounded  transition duration-300
         hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
      >
        <AiOutlineClose size={20} className="text-red-600" />
      </button>
    </div>
  );
};
