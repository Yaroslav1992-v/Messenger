import { useState } from "react";
import { AuthErrors, LoginData } from "./formTypes";
import TextField from "./TextField";
import { FormSubmit, TextFieldChange } from "../../types";
import Button from "../Button";
import { useSelector } from "react-redux";
import { getAuthLoading, signIn } from "../../store/auth";
import { useAppDispatch } from "../../store/createStore";
import { validator } from "../../utils/Validator/validator";
import { loginValidator } from "../../utils/Validator/validatorConfig";
import { Loader } from "../Loader";

export const LoginForm = () => {
  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getAuthLoading());
  const [errors, setErrors] = useState<AuthErrors>({});
  const handleChange = ({ target }: TextFieldChange) => {
    setData((prev) => {
      return { ...prev, [target.name]: target.value };
    });
  };

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    const error = validator({ ...data }, loginValidator);
    if (Object.keys(error).length > 0) {
      setErrors(error);
      return;
    }
    dispatch(signIn(data));
  };
  return (
    <form className="w-full mb-7" onSubmit={handleSubmit}>
      <TextField
        type="text"
        placeholder="Enter Your Email"
        onChange={handleChange}
        name="email"
        error={errors.email}
      />
      <TextField
        type="password"
        placeholder="Enter Your password"
        onChange={handleChange}
        name="password"
        error={errors.password}
      />
      {isLoading ? (
        <Loader size={30} />
      ) : (
        <Button type="submit" text="Sign In" />
      )}
    </form>
  );
};
