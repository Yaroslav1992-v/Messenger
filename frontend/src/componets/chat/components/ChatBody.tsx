import React, { useEffect, useRef } from "react";
import { ChatBodyProps } from "../chatProps";
import { getReadableDate } from "../../../utils/helpers";
import { Message } from "./Message";

export const ChatBody: React.FC<ChatBodyProps> = ({
  messages,
  userId,
  chatId,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [chatId]);
  return (
    <div className="flex flex-col h-full p-8 scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200 overflow-x-hidden   overflow-y-scroll">
      {messages.map((d, i) => (
        <div key={i} className="flex w-full flex-col">
          <div className="flex mx-auto p-1 rounded-md text-gray-100 bg-gray-400">
            {getReadableDate(d[0].createdAt)}
          </div>
          <ul className="w-full flex flex-col">
            {d.map((m) => (
              <li
                key={m._id}
                className={
                  "mb-3 " + (userId === m.sender._id ? "ml-auto  " : "")
                }
              >
                {<Message message={m} userId={userId} />}
              </li>
            ))}
          </ul>
          <div ref={bottomRef}></div>
        </div>
      ))}
    </div>
  );
};
