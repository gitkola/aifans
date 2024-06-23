import { put, call, all, takeLatest } from "redux-saga/effects";
import {
  APP_INIT_REQUEST,
  appInitSuccess,
  appInitFailure,
} from "@/redux/actions/appActions";
import { getTheme } from "../actions/themeActions";
import { handleFetchUser } from "./userSaga";

function* handleAppInit() {
  try {
    yield all([put(getTheme()), call(handleFetchUser)]);
    yield put(appInitSuccess());
  } catch (error: any) {
    yield put(appInitFailure(error?.message || "App initialization failed"));
  }
}

export default function* appSaga() {
  yield takeLatest(APP_INIT_REQUEST, handleAppInit);
}
