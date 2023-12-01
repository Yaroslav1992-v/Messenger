import React from "react";
import { MessageProps } from "../chatProps";
import { ItemPreview } from "../../index";
import { formatDate } from "../../../utils/helpers";
import clsx from "clsx";

export const Message: React.FC<MessageProps> = ({ message, userId }) => {
  const check = userId === message.sender._id;
  return (
    <div className="max-w-lg w-fit">
      <ItemPreview text={message.sender.username} image={message.sender.image}>
        <span className="text-gray-500">{formatDate(message.createdAt)}</span>
      </ItemPreview>

      <div
        className={clsx(
          "max-w-2xl w-full font-medium rounded-md mt-5 break-words",
          check ? " text-white" : "bg-gray-300"
        )}
      >
        {message.image && (
          <div
            className={clsx(
              "rounded-md h-72 w-full  ",
              message.image ? "" : "p-2 "
            )}
          >
            <img
              className="w-full h-full"
              src={message.image}
              alt="messageimg"
            />
          </div>
        )}
        {message.text && (
          <div className="bg-blue-500 p-3 rounded-md">
            <p className="break-words">{message.text}</p>
          </div>
        )}
      </div>
    </div>
  );
};
