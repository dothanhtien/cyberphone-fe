import { apiClient } from "@/lib/api/client";
import { LoginRequest, LoginResponse } from "@/types";

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials,
    );
    
    return response;
  },
};
