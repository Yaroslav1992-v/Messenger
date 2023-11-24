import clsx from "clsx";
import { AvatarProps } from "./componentTypes";

export const Avatar: React.FC<AvatarProps> = ({ size, image }) => {
  const sizes = size === "sm" ? "h-12 w-12" : "";
  return (
    <div className={clsx(`rounded-full bg-gray-400`, sizes)}>
      {image && (
        <img
          className="w-full h-full rounded-full object-cover"
          src={image}
          alt="user"
        />
      )}
    </div>
  );
};
