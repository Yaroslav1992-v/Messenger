import { UserData, UserMinData } from "../store/types";
import httpService from "./httpService";

const apiEndPoint = "/user/";
const userService = {
  getUserById: async (id: string): Promise<UserData> => {
    const { data } = await httpService.get(`${apiEndPoint}getById/${id}`);
    return data;
  },
  searchUser: async (name: string): Promise<UserMinData[]> => {
    const { data } = await httpService.get(
      `${apiEndPoint}searchUser/${name}`,
      {}
    );
    return data;
  },
  getMinUserById: async (id: string): Promise<UserData> => {
    const { data } = await httpService.get(`${apiEndPoint}getMinById/${id}`);
    return data;
  },
  editUser: async (user: UserData): Promise<UserData> => {
    const { data } = await httpService.patch(`${apiEndPoint}edit`, {
      ...user,
    });
    return data;
  },
};

export default userService;
