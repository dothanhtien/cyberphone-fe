import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

import authReducer from "./features/auth/authSlice";
import brandsReducer from "./features/brands/brandsSlice";
import categoriesReducer from "./features/categories/categoriesSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  brands: brandsReducer,
  categories: categoriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "root",
  storage,
  version: 1, // Add versioning to prevent migration issues
  transforms: [
    encryptTransform({
      secretKey: process.env.NEXT_PUBLIC_REDUX_ENCRYPTION_KEY ?? "",
      onError: (error) =>
        console.error("Redux persist encryption error:", error),
    }),
  ],
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AppState = ReturnType<AppStore["getState"]>;
