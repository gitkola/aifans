import { put, takeLatest } from "redux-saga/effects";
import {
  setTheme,
  ISetThemeAction,
  GET_THEME,
  SAVE_THEME,
} from "../actions/themeActions";
import { Theme } from "../reducers/themeReducer";

function* handleSaveTheme(action: ISetThemeAction) {
  yield put(setTheme(action.payload));
  const prevTheme = action.payload === "light" ? "dark" : "light";
  document.documentElement.classList.remove(prevTheme);
  document.documentElement.classList.add(action.payload);
  localStorage.setItem("theme", action.payload);
}

function* handleGetTheme() {
  const theme: Theme = (localStorage.getItem("theme") || "light") as Theme;
  yield put(setTheme(theme));
  const prevTheme = theme === "light" ? "dark" : "light";
  document.documentElement.classList.remove(prevTheme);
  document.documentElement.classList.add(theme);
}

export default function* themeSaga() {
  yield takeLatest(SAVE_THEME, handleSaveTheme);
  yield takeLatest(GET_THEME, handleGetTheme);
}
