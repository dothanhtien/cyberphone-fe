import { User } from "@/features/users/types";

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  data: User;
  accessToken: string;
}
