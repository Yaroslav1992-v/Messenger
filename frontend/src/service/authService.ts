import httpService from "./httpService";
import localStorageService, { Token } from "./localStorageService";

import axios, { AxiosInstance } from "axios";
import configFile from "../config.json";
import { UserData } from "../store/types";
import { LoginData, RegisterData } from "../componets/Form/formTypes";
const token: AxiosInstance = axios.create({
  baseURL: configFile.apiEndPoint,
});

const apiEndPoint = "/auth/";
const authService = {
  register: async (user: RegisterData): Promise<UserData> => {
    const { data } = await httpService.post(`${apiEndPoint}register`, {
      ...user,
    });

    return data;
  },
  login: async ({ email, password }: LoginData): Promise<UserData> => {
    const { data } = await httpService.post(`${apiEndPoint}login`, {
      email,
      password,
    });

    return data;
  },
  refreshToken: async (): Promise<Token> => {
    const { data } = await token.post(`/jwt/token`, {
      token: localStorageService.getRefreshToken(),
      id: localStorageService.getUserId(),
    });
    return data;
  },
};

export default authService;
