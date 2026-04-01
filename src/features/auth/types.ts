import { Gender } from "@/enums";
import { User } from "@/features/users/types";

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  data: User;
  accessToken: string;
}

export interface RegisterRequest {
  username: string;
  phone: string;
  email?: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: Gender;
}
