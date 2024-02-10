import React, { useEffect, useRef, useState } from "react";
import { ChatBodyProps } from "../chatProps";
import { getReadableDate } from "../../../utils/helpers";
import { Message } from "./Message";
import { useApp } from "../../../hooks/UseApp";
import { UserMinData } from "../../../store/types";
import { Typing } from "../../Typing";

export const ChatBody: React.FC<ChatBodyProps> = ({
  messages,
  userId,
  chatId,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [typing, setTyping] = useState<string | null>(null);
  const { socket } = useApp();
  const bodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    socket.on("typing", (data: { chatId: string; user: UserMinData }) => {
      if (data.chatId === chatId) {
        setTyping(data.user.username);
      }
    });
    socket.on("stop-typing", (id) => {
      if (id === chatId) {
        setTyping(null);
      }
    });
  }, []);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [chatId, messages.length]);

  return (
    <div
      ref={bodyRef}
      className="flex flex-col h-full p-8 scrollbar scrollbar-thumb-gray-400 scrollbar-w-1 scrollbar-track-gray-200 overflow-x-hidden   overflow-y-scroll"
    >
      {messages.map((d, i) => (
        <div key={i} className="flex w-full flex-col">
          <div className="flex mx-auto p-1 rounded-md text-gray-100 mb-2 bg-gray-400">
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
                {<Message bodyRef={bodyRef} message={m} userId={userId} />}
              </li>
            ))}
          </ul>
          <div ref={bottomRef}></div>
        </div>
      ))}
      {typing && (
        <div className="flex  relative justify-items-start items-center mt-auto ">
          {<Typing size={10} />}
          <p className="absolute   left-12 whitespace-nowrap  text-gray-500 text-sm font-bold">{` ${typing} is typing`}</p>
        </div>
      )}
    </div>
  );
};
