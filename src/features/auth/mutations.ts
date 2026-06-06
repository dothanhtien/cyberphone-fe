import { useMutation } from "@tanstack/react-query";

import { authApi } from "./api";
import { ForgotPasswordRequest, LoginRequest, RegisterRequest } from "./types";

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => authApi.logout(),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPassword(data),
  });
};
