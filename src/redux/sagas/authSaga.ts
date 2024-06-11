// src/redux/sagas/authSaga.ts

import { call, put, takeLatest } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
} from "../actions/authActions";
import { loginApi, registerApi } from "@/api-client/authApi";

interface LoginAction {
  type: "LOGIN_REQUEST";
  payload: {
    username: string;
    password: string;
  };
}

interface RegisterAction {
  type: "REGISTER_REQUEST";
  payload: {
    username: string;
    password: string;
    email?: string;
  };
}

function* handleLogin(action: LoginAction): any {
  try {
    const { username, password } = action.payload;
    yield call(loginApi, username, password);
    yield put(loginSuccess());
  } catch (error) {
    yield put(loginFailure((error as Error).message));
  }
}

function* handleRegister(action: RegisterAction): any {
  try {
    const { username, password, email } = action.payload;
    yield call(registerApi, username, password, email);
    yield put(registerSuccess());
  } catch (error) {
    yield put(registerFailure((error as Error).message));
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
  yield takeLatest(REGISTER_REQUEST, handleRegister);
}
