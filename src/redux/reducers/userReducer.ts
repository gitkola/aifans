// src/redux/reducers/userReducer.ts

import { Action, createReducer } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "../actions/userActions";
import { User } from "@/models";

interface InitialState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  user: null,
  loading: false,
  error: null,
};

interface HydrateAction extends Action {
  payload?: InitialState;
}

interface FetchUserSuccessAction extends Action<"FETCH_USER_SUCCESS"> {
  payload: User;
}

interface FetchUserFailureAction extends Action<"FETCH_USER_FAILURE"> {
  payload: string;
}

interface UpdateUserSuccessAction extends Action<"UPDATE_USER_SUCCESS"> {
  payload: User;
}

interface UpdateUserFailureAction extends Action<"UPDATE_USER_FAILURE"> {
  payload: string;
}

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(HYDRATE, (state: InitialState, action: HydrateAction) => {
      return { ...state, ...action.payload };
    })
    .addCase(FETCH_USER_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(
      FETCH_USER_SUCCESS,
      (state: InitialState, action: FetchUserSuccessAction) => {
        state.user = action.payload;
        state.loading = false;
      }
    )
    .addCase(
      FETCH_USER_FAILURE,
      (state: InitialState, action: FetchUserFailureAction) => {
        state.loading = false;
        state.error = action.payload;
      }
    )
    .addCase(UPDATE_USER_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(
      UPDATE_USER_SUCCESS,
      (state: InitialState, action: UpdateUserSuccessAction) => {
        state.user = action.payload;
        state.loading = false;
      }
    )
    .addCase(
      UPDATE_USER_FAILURE,
      (state: InitialState, action: UpdateUserFailureAction) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
});

export { userReducer };
