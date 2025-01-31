import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./features/user/user-slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
