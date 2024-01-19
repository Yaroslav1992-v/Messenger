import { SyncLoader } from "react-spinners";
import { bluePrimary } from "../colors/colors";

export const Typing: React.FC<{ size: number }> = ({ size }) => {
  return <SyncLoader size={size} color={bluePrimary} />;
};
