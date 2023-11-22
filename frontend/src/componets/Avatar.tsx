import clsx from "clsx";
import { AvatarProps } from "./componentTypes";

export const Avatar: React.FC<AvatarProps> = ({ size, image }) => {
  const sizes = size === "sm" ? "h-10 w-10" : "";
  return (
    <div className={clsx(`rounded-full bg-gray-400`, sizes)}>
      {image && <img src={image} alt="user" />}
    </div>
  );
};
