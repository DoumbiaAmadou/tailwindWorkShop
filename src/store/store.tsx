import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";

const makeStore = () => {
  return configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
    },
    devTools: true,
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const store = makeStore();
