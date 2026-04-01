import { useMutation } from "@tanstack/react-query";

import { LoginRequest, RegisterRequest } from "./types";
import { authApi } from "./api";

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
  });
};
