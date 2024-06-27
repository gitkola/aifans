import type { IThemeAction } from "../actions/themeActions";
import { SET_THEME } from "../actions/themeActions";
import { Reducer } from "redux";

export type Theme = "light" | "dark";

export interface IThemeState {
  theme: Theme;
}

const initialState: IThemeState = {
  theme: "dark",
};

export const themeReducer: Reducer<IThemeState, IThemeAction> = (
  state: IThemeState = initialState,
  action: IThemeAction
) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};
