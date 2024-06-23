import { call, put, takeLatest } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  LOGOUT_REQUEST,
  loginRequest,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  logoutFailure,
  ILoginRequestAction,
  IRegisterRequestAction,
} from "../actions/authActions";
import { loginApi, logoutApi, registerApi } from "@/api-client/authApi";
import { setUser } from "../actions/userActions";
import { RESET_APP } from "../actions/actionTypes";

function* handleLogin(action: ILoginRequestAction): any {
  try {
    const { user } = yield call(loginApi, action.payload);
    yield put(loginSuccess());
    yield put(setUser(user));
  } catch (error: any) {
    const message =
      error?.message ||
      error?.response?.data?.message ||
      "Something went wrong";
    yield put(loginFailure(message));
  }
}

function* handleRegister(action: IRegisterRequestAction): any {
  try {
    const { password, email } = action.payload;
    yield call(registerApi, action.payload);
    yield put(registerSuccess());
    yield put(loginRequest({ username: email, password }));
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
    yield put(registerFailure(message));
  }
}

function* handleLogout(): any {
  try {
    yield call(logoutApi);
    yield put({ type: RESET_APP });
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
    yield put(logoutFailure(message));
    yield put({ type: RESET_APP });
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
  yield takeLatest(LOGOUT_REQUEST, handleLogout);
  yield takeLatest(REGISTER_REQUEST, handleRegister);
}
