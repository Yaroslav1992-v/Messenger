import { BounceLoader } from "react-spinners";

export const Loader: React.FC<{ size: number }> = ({ size }) => {
  return (
    <div className="flex w-full justify-center">
      <BounceLoader size={size} color="#4299e1" />
    </div>
  );
};
