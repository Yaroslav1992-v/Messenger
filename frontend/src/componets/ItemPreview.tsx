import React from "react";
import { ItemPreviewProps } from "./componentTypes";
import { Title } from "./Title";
import { Avatar } from "./Avatar";

export const ItemPreview: React.FC<ItemPreviewProps> = ({
  text,
  children,
  image,
}) => {
  return (
    <div className="flex items-center mb-3 md:mb-0">
      <div className="mr-5 flex mb-auto">
        <Avatar size="sm" image={image} />
      </div>
      <div className="flex flex-col w-full justify-center mr-auto">
        <Title text={text} hType="h4" className="mb-0 leading-5" />
        {children && children}
      </div>
    </div>
  );
};
