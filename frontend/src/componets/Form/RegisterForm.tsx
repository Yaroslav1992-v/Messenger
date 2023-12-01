import { useEffect, useState } from "react";
import { AuthErrors, RegisterData } from "./formTypes";
import TextField from "./TextField";
import { TextFieldChange, FormSubmit } from "../../types";
import Button from "../buttons/Button";
import { validator } from "../../utils/Validator/validator";
import { registerValidator } from "../../utils/Validator/validatorConfig";
import { useSelector } from "react-redux";
import { getAuthError, getAuthLoading, signUp } from "../../store/auth";

import { Loader } from "../Loader";
import { useAppDispatch } from "../../store/createStore";

export const RegisterForm = () => {
  const [data, setData] = useState<RegisterData>({
    email: "",
    password: "",
    username: "",
  });
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getAuthLoading());
  const [errors, setErrors] = useState<AuthErrors>({});
  const handleChange = ({ target }: TextFieldChange) => {
    setData((prev) => {
      return { ...prev, [target.name]: target.value };
    });
  };
  const authError = useSelector(getAuthError());
  useEffect(() => {
    if (typeof authError === "object" && authError) {
      setErrors(authError);
    }
  }, [authError]);
  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    const error = validator({ ...data }, registerValidator);
    if (Object.keys(error).length > 0) {
      setErrors(error);
      return;
    }
    dispatch(signUp(data));
  };
  return (
    <form onSubmit={handleSubmit} className="w-full mb-7">
      <TextField
        type="text"
        placeholder="Enter your Email"
        onChange={handleChange}
        name="email"
        error={errors?.email}
      />
      <TextField
        type="text"
        placeholder="Enter your username"
        onChange={handleChange}
        name="username"
        error={errors?.username}
      />
      <TextField
        type="password"
        placeholder="Enter your password"
        onChange={handleChange}
        name="password"
        error={errors?.password}
      />
      {isLoading ? (
        <Loader size={30} />
      ) : (
        <Button type="submit" text="Sign Up" />
      )}
    </form>
  );
};
