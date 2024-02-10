import React from "react";
import { MessageWithImageProps } from "./formTypes";
import { MessageArea } from "./MessageArea";
import { EmojiBtn } from "../buttons/EmojiBtn";
import { useSelector } from "react-redux";
import { getIsLoading } from "../../store/message";
import { BounceLoader } from "react-spinners";
import { bluePrimary } from "../../colors/colors";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { AddImageField } from "./AddImageField";
export const MessageWithIMageForm: React.FC<MessageWithImageProps> = ({
  image,
  value,
  onChange,
  openPicker,
  changeImage,
  handleEmoji,
  picker,
}) => {
  const isLoading = useSelector(getIsLoading());
  return (
    <div className="p-4 flex flex-col  md:p-5 w-full">
      <div className="mb-5 rounded-md  h-72 relative">
        <img
          className="rounded-md object-contain w-full h-full"
          src={image}
          alt="Message img"
        />
        <div style={{ top: "-15px" }} className="absolute right-0  ">
          <AddImageField onChange={changeImage} />
        </div>
      </div>
      <div className="flex items-end mb-2  rounded-lg w-full relative">
        {picker && (
          <div className="absolute bottom-0">
            <Picker data={data} onEmojiSelect={handleEmoji} />
          </div>
        )}
        {<MessageArea className="m-0" onChange={onChange} value={value} />}
      </div>

      <div className=" flex w-full justify-end items-center">
        <EmojiBtn onClick={openPicker} />
        {isLoading ? (
          <BounceLoader color={bluePrimary} size={30} />
        ) : (
          <button className="text-blue-600 font-semibold text-lg transition duration-300 ease-in-out rounded-md hover:text-blue-800 focus:outline-none focus:border-blue-800 focus:ring focus:ring-blue-300">
            Send
          </button>
        )}
      </div>
    </div>
  );
};
