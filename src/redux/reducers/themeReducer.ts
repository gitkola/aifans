// src/redux/reducers/themeReducer.ts

import { Action, createReducer } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { SET_THEME } from "../actions/themeActions";

interface InitialState {
  theme: "light" | "dark";
}

const initialState: InitialState = {
  theme: "light",
};

interface HydrateAction extends Action {
  payload?: InitialState;
}

interface SetThemeAction extends Action<"SET_THEME"> {
  payload: "light" | "dark";
}

const themeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(HYDRATE, (state: InitialState, action: HydrateAction) => {
      return { ...state, ...action.payload };
    })
    .addCase(SET_THEME, (state: InitialState, action: SetThemeAction) => {
      state.theme = action.payload;
    });
});

export { themeReducer };
