import { User } from "./users";

export interface LoginData {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  data: User;
  accessToken: string;
}
