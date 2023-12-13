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
export const MessageForm: React.FC<MessageFormProps> = ({ chatId, userId }) => {
  const { isDark } = useApp();

  const [message, setMessage] = useState<string>("");
  const handleChange = (e: TextAreaChange) => {
    setMessage(e.target.value);
  };
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<File | undefined>();
  const [modal, setModal] = useState<boolean>(false);
  const closeModal = () => {
    setModal(false);
    setImage(undefined);
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
    if (message || image) {
      const newMessage: CreateMessageData = {
        sender: userId,
        chatId,
        text: message,
        image: image,
      };
      const data = await dispatch(createMessage(newMessage));
      if (data) {
        setMessage("");
        if (modal) {
          setModal(false);
        }
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="chat" className="sr-only">
          Your message
        </label>
        <div className="flex md:flex-nowrap flex-wrap items-end px-3   rounded-lg md:py-2 ">
          <AddImageField onChange={handleImage} />
          <EmojiBtn />
          <div className="flex w-full items-center">
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
              value={message}
              onChange={handleChange}
            />
          </Modal>
        )}
      </form>
    </>
  );
};
