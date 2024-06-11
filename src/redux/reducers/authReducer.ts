// src/redux/reducers/authReducer.ts

import { createReducer } from "@reduxjs/toolkit";
import { Action } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../actions/authActions";

interface InitialState {
  isAuthenticated: boolean;
  loading: boolean;
  loginError: string | null;
  registerError: string | null;
}

const initialState: InitialState = {
  isAuthenticated: false,
  loading: false,
  loginError: null,
  registerError: null,
};

interface HydrateAction extends Action {
  payload?: InitialState;
}

interface LoginFailureAction extends Action<"LOGIN_FAILURE"> {
  payload: string;
}

interface RegisterFailureAction extends Action<"REGISTER_FAILURE"> {
  payload: string;
}

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(HYDRATE, (state: InitialState, action: HydrateAction) => {
      return { ...state, ...action.payload };
    })
    .addCase(LOGIN_REQUEST, (state) => {
      state.loading = true;
      state.loginError = null;
    })
    .addCase(LOGIN_SUCCESS, (state) => {
      state.isAuthenticated = true;
      state.loading = false;
    })
    .addCase(
      LOGIN_FAILURE,
      (state: InitialState, action: LoginFailureAction) => {
        state.loading = false;
        state.loginError = action.payload;
      }
    )
    .addCase(LOGOUT, (state) => {
      state.isAuthenticated = false;
    })
    .addCase(REGISTER_REQUEST, (state) => {
      state.loading = true;
      state.registerError = null;
    })
    .addCase(REGISTER_SUCCESS, (state) => {
      state.loading = false;
    })
    .addCase(
      REGISTER_FAILURE,
      (state: InitialState, action: RegisterFailureAction) => {
        state.loading = false;
        state.registerError = action.payload;
      }
    );
});

export { authReducer };
