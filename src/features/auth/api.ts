import { apiClient } from "@/lib/axios/client";
import { LoginRequest, LoginResponse, RegisterRequest } from "./types";

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    return apiClient.post("/auth/login", credentials);
  },

  register: async (data: RegisterRequest): Promise<{ id: string }> => {
    return apiClient.post("/auth/register", data);
  },
};
