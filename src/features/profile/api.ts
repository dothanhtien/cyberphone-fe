import { apiClient } from "@/lib/axios/client";
import { Profile, UpdateProfileRequest } from "./types";

export const profileApi = {
  get: async (): Promise<Profile> => {
    return apiClient.get("/profile");
  },

  update: async (data: UpdateProfileRequest): Promise<{ id: string }> => {
    return apiClient.patch("/profile", data);
  },
};
