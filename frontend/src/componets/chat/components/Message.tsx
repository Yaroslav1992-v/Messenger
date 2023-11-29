import React from "react";
import { MessageProps } from "../chatProps";
import { UserPreview } from "../../index";
import { formatDate } from "../../../utils/helpers";
import clsx from "clsx";

export const Message: React.FC<MessageProps> = ({ message, userId }) => {
  const check = userId === message.sender._id;
  return (
    <div className="max-w-lg w-fit">
      <UserPreview text={message.sender.username} image={message.sender.image}>
        <span className="text-gray-500">{formatDate(message.createdAt)}</span>
      </UserPreview>

      <div
        className={clsx(
          "p-3 w-fit font-medium rounded-md mt-5",
          check ? "bg-blue-500 text-white" : "bg-gray-300"
        )}
      >
        {message.text && <p>{message.text}</p>}
      </div>
    </div>
  );
};
