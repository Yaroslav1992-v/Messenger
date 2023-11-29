import React from "react";
import { UserPreviewProps } from "./componentTypes";
import { Title } from "./Title";
import { Avatar } from "./Avatar";

export const UserPreview: React.FC<UserPreviewProps> = ({
  text,
  children,
  image,
}) => {
  return (
    <div className="flex items-center   ">
      <div className="mr-5">
        <Avatar size="sm" image={image} />
      </div>
      <div className="flex flex-col w-full justify-center mr-auto">
        <Title text={text} hType="h4" className="mb-0 leading-3" />
        {children && children}
      </div>
    </div>
  );
};
