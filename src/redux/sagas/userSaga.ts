// src/redux/sagas/userSaga.ts

import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUserSuccess,
  fetchUserFailure,
  updateUserSuccess,
  updateUserFailure,
} from "../actions/userActions";
import {
  FETCH_USER_REQUEST,
  UPDATE_USER_REQUEST,
} from "../actions/userActions";
import { fetchUserProfile, updateUserProfile } from "../../api-client/userApi";
import { User } from "@/models";

function* handleFetchUser() {
  try {
    const user: User = yield call(fetchUserProfile);
    yield put(fetchUserSuccess(user));
  } catch (error) {
    yield put(fetchUserFailure((error as Error).message));
  }
}

function* handleUpdateUser(action: any) {
  try {
    const user: User = yield call(updateUserProfile, action.payload);
    yield put(updateUserSuccess(user));
  } catch (error) {
    yield put(updateUserFailure((error as Error).message));
  }
}

export default function* userSaga() {
  yield takeLatest(FETCH_USER_REQUEST, handleFetchUser);
  yield takeLatest(UPDATE_USER_REQUEST, handleUpdateUser);
}
