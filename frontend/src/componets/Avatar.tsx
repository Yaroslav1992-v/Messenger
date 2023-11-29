import clsx from "clsx";
import { AvatarProps } from "./componentTypes";

export const Avatar: React.FC<AvatarProps> = ({ size, image }) => {
  const sizes = size === "sm" ? "h-12 w-12" : "h-40 w-40";
  return (
    <div className={clsx(`rounded-full bg-gray-400`, sizes)}>
      {image && (
        <img
          className="w-full h-full rounded-full object-contain"
          src={image}
          alt="user"
        />
      )}
    </div>
  );
};
