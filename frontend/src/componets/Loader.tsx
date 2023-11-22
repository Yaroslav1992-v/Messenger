import { BounceLoader } from "react-spinners";
import { bluePrimary } from "../colors/colors";

export const Loader: React.FC<{ size: number }> = ({ size }) => {
  return (
    <div className="flex w-full justify-center">
      <BounceLoader size={size} color={bluePrimary} />
    </div>
  );
};
