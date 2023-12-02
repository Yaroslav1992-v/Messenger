import React, { useEffect, useState } from "react";
import { FormSubmit, TextAreaChange, TextFieldChange } from "../../types";
import { InputField } from "./InputField";
import { useSelector } from "react-redux";
import { useApp } from "../../hooks/UseApp";
import { getCurrentUserId } from "../../store/auth";
import { useAppDispatch } from "../../store/createStore";
import { getSearchedUsers, searchUser } from "../../store/user";
import { checkString } from "../../utils/helpers";
import { SearchField } from "./SearchField";
import { ItemPreview } from "../ItemPreview";
import {
  EditChatData,
  GroupChat,
  GroupChatCreateData,
  UserMinData,
} from "../../store/types";
import { AboutTextArea } from "./AboutTextArea";
import Button from "../buttons/Button";
import { SelectedUsers } from "../Users/componets/SelectedUsers";
import { validator } from "../../utils/Validator/validator";
import { groupChatValidator } from "../../utils/Validator/validatorConfig";
import { GroupErrors, GroupFormProps } from "./formTypes";
import { createGroupChat, editChat, getIsLoading } from "../../store/chat";
import { Loader } from "../Loader";
import { AvatarField } from "./AvatarField";
import { ToastContainer } from "react-toastify";
import { showToastMessage } from "../../utils/toast";

export const GroupForm: React.FC<GroupFormProps> = ({ chat }) => {
  const chatType = chat && "admin" in chat;
  const [imagePreview, setImagePreview] = useState<string>(
    chatType ? chat.image || "" : ""
  );
  const [image, setImage] = useState<File | undefined>();
  const [imageError, setImageError] = useState<string>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueries, setSearchQueries] = useState<string[]>([]);
  const [users, setUsers] = useState<UserMinData[]>(chatType ? chat.users : []);
  const { isDark } = useApp();
  const isLoading = useSelector(getIsLoading());
  const [errors, setErrors] = useState<GroupErrors>({});
  const currentUserId = useSelector(getCurrentUserId());
  const searchedUsers = useSelector(getSearchedUsers());
  const filteredUsers = searchedUsers.filter(
    (u) => checkString(searchQuery, u.username) && u._id !== currentUserId
  );
  const dispatch = useAppDispatch();
  const handleSearchQuery = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    await setSearchQuery(target.value);
  };
  useEffect(() => {
    if (searchQuery && !searchQueries.includes(searchQuery)) {
      setSearchQueries((prevState) => [...prevState, searchQuery]);
      dispatch(searchUser(searchQuery));
    }
  }, [searchQuery]);

  const [data, setData] = useState<{ name: string; description: string }>({
    name: chatType ? chat.name : "",
    description: chatType ? chat.description || "" : "",
  });
  const handleChange = (e: TextFieldChange | TextAreaChange) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const removeUser = (id: string) => {
    const people = users.filter((u) => u._id !== id);
    setUsers(people);
  };
  const handleUsers = (id: string, user: UserMinData) => {
    const newUsers = [...users];
    const checkUser = newUsers.find((u) => u._id === id);
    if (!checkUser) {
      newUsers.unshift(user);
      setUsers(newUsers);
    }
  };
  const handleSubmit = async (e: FormSubmit) => {
    e.preventDefault();
    const err = validator(
      { ...data, users: users.length.toString() },
      groupChatValidator
    );
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }
    if (currentUserId && Object.keys(errors).length === 0) {
      const groupChat: GroupChatCreateData = {
        name: data.name,
        admin: currentUserId,
        users: [...users.map((u) => u._id), currentUserId],
        isGroup: true,
        description: data.description,
      };
      if (!chatType) {
        dispatch(createGroupChat(groupChat, image));
      } else {
        if (chat.admin !== currentUserId) {
          showToastMessage("error", "Unuthorized");
          return;
        }
        const editedChat: EditChatData = {
          name: data.name,
          admin: currentUserId,
          isGroup: true,
          users: [...users.map((u) => u._id)],
          description: data.description,
          _id: chat._id,
        };
        const msg = await dispatch(editChat(editedChat, image));
        if (msg) {
          showToastMessage("success", msg);
        }
      }
    }
  };
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files![0];
    if (!file) {
      setImagePreview("");
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
    setImageError("");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Group Name"
          name="name"
          placeholder="Group Name"
          value={data.name}
          onChange={handleChange}
          error={errors.name}
        />{" "}
        <AvatarField
          label="Group Photo"
          error={imageError}
          onChange={handleImage}
          image={imagePreview}
        />
        <SearchField
          placeholder="Add Users To Group"
          search={handleSearchQuery}
          value={searchQuery}
          error={errors.users}
        />
        {users.length > 0 && (
          <SelectedUsers
            admin={chatType ? chat.admin : ""}
            text={chatType ? "Add New Users Or Remove" : " Selected Users"}
            users={users}
            remove={removeUser}
          />
        )}
        {filteredUsers && (
          <ul className="p-2   ">
            {filteredUsers.map((u) => (
              <li
                onClick={() => handleUsers(u._id, u)}
                className="border-b border-gray-300 mb-5 py-2 rounded-sm cursor-pointer"
                key={u._id}
              >
                {<ItemPreview text={u.username} image={u.image} />}
              </li>
            ))}
          </ul>
        )}
        <AboutTextArea
          name="description"
          label="Description"
          placeholder=""
          value={data.description}
          onChange={handleChange}
        />
        {isLoading ? (
          <Loader size={30} />
        ) : (
          <Button type="submit" text={chatType ? "Save" : "Create Group"} />
        )}
      </form>
      <ToastContainer />
    </>
  );
};
