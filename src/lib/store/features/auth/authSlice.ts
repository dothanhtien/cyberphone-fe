import { User } from "@/app/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedInUser: (
      state,
      action: PayloadAction<User & { accessToken: string }>
    ) => {
      const { accessToken, ...userInfo } = action.payload;
      state.user = userInfo;
      state.isAuthenticated = !!accessToken;
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", accessToken);
      }
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
      }
    },
  },
});

export const { setLoggedInUser, setIsAuthenticated, logout } =
  authSlice.actions;

export default authSlice.reducer;
