import { ChatOrGroupChat } from "../../store/types";
import { FormSubmit, TextAreaChange, TextFieldChange } from "../../types";

export interface LoginData {
  email: string;
  password: string;
}
export interface RegisterData extends LoginData {
  email: string;
  username: string;
}

export interface Social {
  name: string;
  value: string;
}
export interface TextFieldProps {
  type: "text" | "password";
  placeholder: string;
  onChange: (e: TextFieldChange) => void;
  name: string;
  error?: string;
}
export interface InputFieldProps extends Omit<TextFieldProps, "type"> {
  label: string;
  value: string;
  onChange: (e: TextFieldChange | TextAreaChange) => void;
}
export interface AuthErrors extends Partial<RegisterData> {}
export interface AvatarFieldProps {
  image: string;
  onChange: (e: TextFieldChange) => void;
  error?: string;
  label: string;
}
export interface EditErrors extends Partial<RegisterData> {}
export interface SocialInputProps {
  Icon: JSX.Element;
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: TextFieldChange) => void;
}
export interface SearchFieldProps {
  search: (e: TextFieldChange) => void;
  value: string;
  placeholder: string;
  error?: string;
}
export interface AddImageFieldProps {
  onChange: (e: TextFieldChange) => void;
}
export interface MessageFormProps {
  chat: ChatOrGroupChat;
  userId: string;
}
export interface MessageWithImageProps {
  image: string;
  onChange: (e: TextAreaChange) => void;
  changeImage: (e: TextFieldChange) => void;
  value: string;
  openPicker: () => void;
  handleEmoji: (e: any) => void;
  picker: boolean;
}
export interface MessageAreaProps {
  value: string;
  onChange: (e: TextAreaChange) => void;
  className?: string;
}
export interface GroupErrors {
  name?: string;
  users?: string;
}
export interface GroupFormProps {
  chat?: ChatOrGroupChat;
}
