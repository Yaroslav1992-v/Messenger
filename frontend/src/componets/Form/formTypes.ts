import { TextFieldChange } from "../../types";

export interface LoginData {
  email: string;
  password: string;
}
export interface RegisterData extends LoginData {
  email: string;
  username: string;
}
export interface TextFieldProps {
  type: "text" | "password";
  placeholder: string;
  onChange: (e: TextFieldChange) => void;
  name: string;
  error?: string;
}
export interface AuthErrors extends Partial<RegisterData> {}
