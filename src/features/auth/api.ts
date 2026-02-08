import { apiClient } from "@/lib/axios/client";
import { LoginRequest, LoginResponse } from "@/types";

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    return apiClient.post<LoginResponse>("/auth/login", credentials);
  },
};
