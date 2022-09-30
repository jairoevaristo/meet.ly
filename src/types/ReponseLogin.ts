import { ResponseUserInformation } from "./ResponseUserInformation";

export interface ResponseLoginUser {
  token: string;
  user: ResponseUserInformation;
}