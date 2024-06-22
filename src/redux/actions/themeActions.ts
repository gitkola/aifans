import type { Theme } from "../reducers/themeReducer";
export const SET_THEME = "SET_THEME";
export const SAVE_THEME = "SAVE_THEME";
export const GET_THEME = "GET_THEME";

export interface ISetThemeAction {
  type: typeof SET_THEME;
  payload: Theme;
}
export const setTheme = (theme: Theme): ISetThemeAction => ({
  type: SET_THEME,
  payload: theme,
});
export interface ISaveThemeAction {
  type: typeof SAVE_THEME;
  payload: Theme;
}
export const saveTheme = (theme: Theme): ISaveThemeAction => ({
  type: SAVE_THEME,
  payload: theme,
});
export interface IGetThemeAction {
  type: typeof GET_THEME;
}
export const getTheme = (): IGetThemeAction => ({
  type: GET_THEME,
});
