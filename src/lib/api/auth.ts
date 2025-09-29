import { LoginData, LoginResponse } from "@/interfaces";
import apiClient from "./client";

export function login(data: LoginData) {
  return apiClient.post<LoginResponse>("/auth/login", data);
}
