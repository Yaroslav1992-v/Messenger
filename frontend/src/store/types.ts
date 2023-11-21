import { RegisterData } from "../componets/Form/formTypes";

export interface UserData extends Omit<RegisterData, "password"> {
  _id: string;
  image?: string;
  accessToken: string;
  refreshToken: string;
}
