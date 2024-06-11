// src/redux/actions/themeActions.ts

export const SET_THEME = "SET_THEME";

export type Theme = "light" | "dark";

export const setTheme = (theme: Theme) => ({
  type: SET_THEME,
  payload: theme,
});
