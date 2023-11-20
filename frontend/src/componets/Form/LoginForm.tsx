import { useState } from "react";
import { LoginData } from "./formTypes";
import TextField from "./TextField";
import { TextFieldChange } from "../../types";
import Button from "../Button";

export const LoginForm = () => {
  const [data, setData] = useState<LoginData>();
  const handleChange = (e: TextFieldChange) => {};
  return (
    <form className="w-full mb-7">
      <TextField
        type="text"
        placeholder="Enter Your Email"
        onChange={handleChange}
        name="email"
      />
      <TextField
        type="password"
        placeholder="Enter Your password"
        onChange={handleChange}
        name="password"
      />
      <Button type="submit" text="Sign In" />
    </form>
  );
};
