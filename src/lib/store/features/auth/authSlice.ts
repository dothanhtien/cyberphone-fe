import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/interfaces";

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
      action: PayloadAction<{ data: User; accessToken: string }>
    ) => {
      const { accessToken, data } = action.payload;
      state.user = data;
      state.isAuthenticated = !!accessToken;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setLoggedInUser, setIsAuthenticated, logout } =
  authSlice.actions;

export default authSlice.reducer;
