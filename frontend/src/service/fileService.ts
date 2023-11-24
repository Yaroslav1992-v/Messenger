import axios, { AxiosInstance } from "axios";
import configFile from "../config.json";

import httpService from "./httpService";
const file: AxiosInstance = axios.create({
  baseURL: configFile.apiEndPoint,
});

const fileService = {
  uploadFile: async (image: File) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "fsj75ivt");
    const response = await file.post(configFile.cloudinary + "/upload", data);
    return response.data.url;
  },

  deleteFile: async (url: string) => {
    try {
      const id = getPublicIdFromUrl(url);
      await httpService.delete(`/file/deleteByUrl/${id}`);
    } catch (error: any) {
      console.log(error);
    }
  },
};
export const getPublicIdFromUrl = (imageUrl: string): string | undefined => {
  const baseUrl = "http://res.cloudinary.com/";
  const parts = imageUrl.split(baseUrl);

  if (parts.length < 2) {
    return undefined;
  }
  const cloudNameAndPath = parts[1].split("/");
  const fileName = cloudNameAndPath[cloudNameAndPath.length - 1];
  const lastDotIndex = fileName.lastIndexOf(".");
  const publicId = fileName.substring(0, lastDotIndex);
  return publicId;
};

export default fileService;
