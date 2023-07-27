import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";
import { UserType } from "./type";

// Type for our state
export interface AuthState {
  authState: {
    status: boolean;
    user?: UserType;
  };
}

// Initial state
const initialState: AuthState = {
  authState: {
    status: false,
    user: undefined,
  },
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("Hydrate: state=>", state, " action=>", action);
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export type ActionType = typeof authSlice.actions;
export const { setAuthState } = authSlice.actions;
export const selectAuthState = (state: AppState) => state.auth.authState;

export default authSlice.reducer;
