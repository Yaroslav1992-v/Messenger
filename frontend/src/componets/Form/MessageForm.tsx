import React, { useState } from "react";
import { AddImageField, EmojiBtn, MessageBtn, Modal } from "../index";
import { useApp } from "../../hooks/UseApp";
import { MessageFormProps } from "./formTypes";
import { FormSubmit, TextAreaChange } from "../../types";
import { CreateMessageData } from "../../store/types";
import { useAppDispatch } from "../../store/createStore";
import { createMessage } from "../../store/message";
import { MessageArea } from "./MessageArea";
import { MessageWithIMageForm } from "./MessageWithIMageForm";
import { FaImage } from "react-icons/fa";
import { white } from "../../colors/colors";
import { editChat, updateChat } from "../../store/chat";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
export const MessageForm: React.FC<MessageFormProps> = ({ chat, userId }) => {
  const { isDark, socket } = useApp();
  const users = chat.users.map((u) => u._id);
  const [message, setMessage] = useState<string>("");
  const handleChange = (e: TextAreaChange) => {
    handleTyping();
    setMessage(e.target.value);
  };
  const [picker, setPicker] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<File | undefined>();
  const [modal, setModal] = useState<boolean>(false);
  const closeModal = () => {
    setModal(false);
    setImage(undefined);
  };
  const handleEmoji = (e: any) => {
    let msg = message.trim();
    msg = msg + " " + e.native;
    setMessage(msg);
    setPicker(false);
  };
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageError, setImageError] = useState<string>();
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files![0];
    if (!file) {
      return;
    }
    if (file.size >= 3125576) {
      setImageError("Max File Size is 3mb");
      return;
    }
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(file.name)) {
      setImageError(
        "Invalid file type. Only JPG, JPEG, and PNG files are allowed."
      );
      return;
    }
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setModal(true);
    setImageError("");
  };
  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();
    if (!chat.isGroup && "userThatLeft" in chat) {
      const u = users.find((u) => u === chat.userThatLeft);
      if (u) {
        dispatch(editChat({ ...chat, userThatLeft: null } as any));
      }
    }
    if (message || image) {
      const newMessage: CreateMessageData = {
        sender: userId,
        chatId: chat._id,
        text: message,
        image: image,
        notRead: users.filter((u) => u !== userId),
      };
      const data = await dispatch(createMessage(newMessage));
      if (data) {
        socket.emit("message", data);
        dispatch(updateChat(data));
        setMessage("");
        socket.emit("stop-typing", {
          users: users.filter((u) => u !== userId),
          chatId: chat._id,
        });
        if (modal) {
          setModal(false);
        }
      }
    }
  };
  const handleTyping = () => {
    socket.emit("typing", {
      users: users.filter((u) => u !== userId),
      chatId: chat._id,
      user: chat.users.find((u) => u._id === userId),
    });

    setTimeout(() => {
      socket.emit("stop-typing", {
        users: users.filter((u) => u !== userId),
        chatId: chat._id,
      });
    }, 5000);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="chat" className="sr-only">
          Your message
        </label>
        <div className="flex md:flex-nowrap flex-wrap items-end px-3   rounded-lg md:py-2 ">
          <AddImageField onChange={handleImage} />
          <EmojiBtn onClick={() => setPicker(!picker)} />
          <div className="flex w-full items-center relative">
            {picker && !modal && (
              <div className="absolute bottom-0">
                <Picker data={data} onEmojiSelect={handleEmoji} />
              </div>
            )}
            <MessageArea onChange={handleChange} value={message} />
            <MessageBtn />
          </div>
        </div>
        {modal && (
          <Modal
            Icon={<FaImage className="mr-1" color={white} size={20} />}
            close={closeModal}
            modalName="Send an Image"
          >
            <MessageWithIMageForm
              image={imagePreview}
              changeImage={handleImage}
              handleEmoji={handleEmoji}
              openPicker={() => setPicker(!picker)}
              value={message}
              picker={picker}
              onChange={handleChange}
            />
          </Modal>
        )}
      </form>
    </>
  );
};
