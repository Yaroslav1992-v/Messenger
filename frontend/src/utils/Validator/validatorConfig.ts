import { ValidationConfig } from "./validator.props";

export const registerValidator: ValidationConfig = {
  email: {
    isRequired: { message: "Email is Required For Registration " },
    isEmail: { message: "Invalid Email " },
  },
  username: {
    isRequired: { message: "Username is Required For Registration " },
    min: {
      message: "Username name must contain  at least 5 symbols",
      value: 5,
    },
  },
  password: {
    isRequired: { message: "Password is Required For Registration " },
    isCapitalSymbol: {
      message: "Password Must Have One Capital Symbol",
    },

    isContainDigit: {
      message: "Password Must At Least One Digit",
    },
    min: {
      message: "Password Must Contain At Least 8 Symbols",
      value: 8,
    },
  },
};
export const editValidator: ValidationConfig = {
  email: {
    isRequired: { message: "Email is Required   " },
    isEmail: { message: "Invalid Email " },
  },
  username: {
    isRequired: { message: "Username is Required  " },
    min: {
      message: "Username name must contain  at least 5 symbols",
      value: 5,
    },
  },
};
export const loginValidator: ValidationConfig = {
  email: {
    isRequired: { message: "Email is Required For Login" },
  },

  password: {
    isRequired: { message: "Password is Required For Login " },
  },
};
export const groupChatValidator: ValidationConfig = {
  name: {
    isRequired: { message: "Group Name is Required  " },
  },
  users: {
    length: { message: "Group must have at least 2 users  " },
  },
};
