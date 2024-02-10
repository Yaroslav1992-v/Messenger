import React, { useEffect, useRef, useState } from "react";
import { MessageProps } from "../chatProps";
import { Confirm, ItemPreview } from "../../index";
import { formatDate } from "../../../utils/helpers";
import clsx from "clsx";
import { Message as Msg } from "../../../store/types";
import { useAppDispatch } from "../../../store/createStore";
import {
  deleteMessage,
  getIsLoading,
  updateMessage,
} from "../../../store/message";

import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
export const Message: React.FC<MessageProps> = ({
  message,
  userId,
  bodyRef,
}) => {
  const check = userId === message.sender._id;
  const messageRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getIsLoading());
  const [action, setAction] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const handleScroll = () => {
    if (messageRef.current) {
      const rect = messageRef.current.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (!isLoading && isVisible && message.notRead.includes(userId)) {
        const readMessage: Msg = {
          ...message,
          notRead: message.notRead.filter((u) => u !== userId),
        };
        message = { ...readMessage };
        dispatch(updateMessage(readMessage, true));
      }
    }
  };
  const removeMessage = () => {
    dispatch(deleteMessage(message));
  };
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (bodyRef.current) {
        bodyRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [message]);

  return (
    <div ref={messageRef} className="max-w-lg w-fit relative">
      <ItemPreview text={message.sender.username} image={message.sender.image}>
        <span className="text-gray-500">{formatDate(message.createdAt)}</span>
      </ItemPreview>

      <div
        onMouseUp={() => setAction(!action)}
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
          <div
            className={clsx(
              !check ? "bg-gray-200 text-black" : "bg-blue-500",
              " p-3 rounded-md"
            )}
          >
            <p className="break-words">{message.text}</p>
          </div>
        )}
      </div>
      {message.sender._id === userId && action && (
        <div className="absolute cursor-pointer right-1 bottom-0  z-40 p-1  flex items-center ">
          <button onClick={() => setConfirm(true)}>
            <MdDelete color="red" />
          </button>
        </div>
      )}
      {confirm && (
        <Confirm cancel={() => setConfirm(false)} action={removeMessage} />
      )}
    </div>
  );
};
