import { Gender } from "@/enums";

export type AuthUserType = "user" | "customer";

export interface AuthUser {
  id: string;
  type: AuthUserType;
  phone: string;
  email: string | null;
  firstName: string;
  lastName: string;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  data: AuthUser;
  accessToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface RegisterRequest {
  phone: string;
  email?: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: Gender;
}
