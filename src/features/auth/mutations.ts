import { useMutation } from "@tanstack/react-query";

import { LoginRequest } from "./types";
import { authApi } from "./api";

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
  });
};
