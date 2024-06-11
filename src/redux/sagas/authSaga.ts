// src/redux/sagas/authSaga.ts

import { call, put, takeLatest } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  LOGOUT,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  logout,
} from "../actions/authActions";
import { loginApi, logoutApi, registerApi } from "@/api-client/authApi";
import { fetchUserSuccess } from "../actions/userActions";

interface LoginAction {
  type: "LOGIN_REQUEST"; // TODO: fix hardcode
  payload: {
    username: string;
    password: string;
  };
}

interface LogoutAction {
  type: "LOGOUT"; // TODO: fix hardcode
  payload: {
    username: string;
    password: string;
  };
}

interface RegisterAction {
  type: "REGISTER_REQUEST"; // TODO: fix hardcode
  payload: {
    username: string;
    password: string;
    email?: string;
  };
}

function* handleLogin(action: LoginAction): any {
  try {
    const { username, password } = action.payload;
    const data = yield call(loginApi, username, password);
    yield put(loginSuccess());
    yield put(fetchUserSuccess(data.user));
  } catch (error: any) {
    // TODO: Type error.
    const message = error?.response?.data?.message || "Something went wrong";
    yield put(loginFailure(message));
  }
}

function* handleRegister(action: RegisterAction): any {
  try {
    const { username, password, email } = action.payload;
    yield call(registerApi, username, password, email);
    yield put(registerSuccess());
    yield handleLogin({
      type: LOGIN_REQUEST,
      payload: { username, password },
    });
  } catch (error: any) {
    // TODO: Type error.
    const message = error?.response?.data?.message || "Something went wrong";
    yield put(registerFailure(message));
  }
}

function* handleLogout(): any {
  try {
    yield call(logoutApi);
    yield put(logout());
  } catch (error: any) {
    // TODO: Type error.
    const message = error?.response?.data?.message || "Something went wrong";
    yield put(loginFailure(message));
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
  yield takeLatest(LOGOUT, handleLogout);
  yield takeLatest(REGISTER_REQUEST, handleRegister);
}
