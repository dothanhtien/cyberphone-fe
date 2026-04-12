import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { AuthUser } from "@/features/auth/types";

interface AuthState {
  user?: AuthUser;
  accessToken?: string;
  hasHydrated: boolean;

  setSession: (payload: { user: AuthUser; accessToken: string }) => void;
  setAccessToken: (accessToken: string) => void;
  clearSession: () => void;
  setHasHydrated: (state: boolean) => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: undefined,
        accessToken: undefined,
        hasHydrated: false,

        setSession: ({ user, accessToken }) => set({ user, accessToken }),

        setAccessToken: (accessToken) => set({ accessToken }),

        clearSession: () => set({ user: undefined, accessToken: undefined }),

        setHasHydrated: (state) => set({ hasHydrated: state }),

        isAuthenticated: () => Boolean(get().accessToken),
      }),
      {
        name: "auth-storage",
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      },
    ),
    { name: "auth-store" },
  ),
);
