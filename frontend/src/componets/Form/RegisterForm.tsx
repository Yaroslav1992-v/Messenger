import { useState } from "react";
import { RegisterData } from "./formTypes";
import TextField from "./TextField";
import { TextFieldChange } from "../../types";
import Button from "../Button";

export const RegisterForm = () => {
  const [data, setData] = useState<RegisterData>();
  const handleChange = (e: TextFieldChange) => {};
  return (
    <form className="w-full mb-7">
      <TextField
        type="text"
        placeholder="Enter your Email"
        onChange={handleChange}
        name="email"
      />
      <TextField
        type="text"
        placeholder="Enter your username"
        onChange={handleChange}
        name="username"
      />
      <TextField
        type="password"
        placeholder="Enter your password"
        onChange={handleChange}
        name="password"
      />
      <Button type="submit" text="Sign Up" />
    </form>
  );
};
