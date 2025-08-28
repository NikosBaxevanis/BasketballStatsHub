import {
  LoginRequestType,
  LoginResponseType,
  RegisterRequestType,
  RegisterResponseType,
} from "../../types";
import { axiosInstance } from "../axiosInstance";

export const loginUser = async ({
  username,
  password,
}: LoginRequestType): Promise<LoginResponseType> => {
  const res = await axiosInstance.post("/auth/login", {
    username,
    password,
  });
  return res.data;
};

export const registerUser = async ({
  username,
  password,
  role,
}: RegisterRequestType): Promise<RegisterResponseType> => {
  const res = await axiosInstance.post("/auth/register", {
    username,
    password,
    role,
  });
  return res.data;
};
