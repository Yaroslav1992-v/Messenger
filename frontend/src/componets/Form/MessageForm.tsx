import React, { useRef, useState } from "react";
import { AddImageField, EmojiBtn, MessageBtn } from "../index";
import { useApp } from "../../hooks/UseApp";
import clsx from "clsx";
import { MessageFormProps } from "./formTypes";
import { FormSubmit } from "../../types";
import { CreateMessageData } from "../../store/types";
import { useAppDispatch } from "../../store/createStore";
import { createMessage } from "../../store/message";

export const MessageForm: React.FC<MessageFormProps> = ({ chatId, userId }) => {
  const { isDark } = useApp();
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {};
  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (messageRef.current?.value) {
      const message: CreateMessageData = {
        sender: userId,
        chatId,
        text: messageRef.current?.value,
      };
      dispatch(createMessage(message));
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="chat" className="sr-only">
        Your message
      </label>

      <div className="flex items-end px-3 py-2 rounded-lg  ">
        <AddImageField onChange={handleImage} />
        <EmojiBtn />
        <div className="flex flex-col w-full">
          <textarea
            ref={messageRef}
            id="chat"
            className={clsx(
              "block mx-4 p-2.5  text-sm   rounded-lg border",
              isDark
                ? "bg-primary border-gray-700 text-gray-300"
                : "bg-white focus:outline-blue-500   text-gray-900 border-gray-200"
            )}
            placeholder="Your message..."
          ></textarea>{" "}
        </div>
        <MessageBtn />
      </div>
    </form>
  );
};
