import { Gender } from "@/enums";

export type AuthUserType = "user" | "customer";

export interface AuthUser {
  id: string;
  type: AuthUserType;
  email: string;
  phone: string | null;
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
  email: string;
  phone?: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: Gender;
}

export interface ForgotPasswordRequest {
  email: string;
}
