import { RegisterData } from "../componets/Form/formTypes";

export interface UserData extends Omit<RegisterData, "password"> {
  _id: string;
  image?: string;
  city?: string;
  phone?: string;
  about?: string;
  website?: string;
  social?: Social[];
  profession?: string;
  accessToken: string;
  refreshToken: string;
}
export interface Social {
  name: string;
  value: string;
}
export interface UserMinData {
  username: string;
  image?: string;
  _id: string;
  profession?: string;
}
