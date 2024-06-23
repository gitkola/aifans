import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUserSuccess,
  fetchUserFailure,
  updateUserSuccess,
  updateUserFailure,
  FETCH_USER_REQUEST,
  UPDATE_USER_REQUEST,
} from "../actions/userActions";
import { fetchUserProfile, updateUserProfile } from "../../api-client/userApi";
import { IUser } from "@/types";

export function* handleFetchUser() {
  try {
    const data: { user: IUser } = yield call(fetchUserProfile);
    yield put(fetchUserSuccess(data.user));
  } catch (error: any) {
    const message =
      error?.message ||
      error?.response?.data?.message ||
      "Something went wrong";
    yield put(fetchUserFailure(message));
  }
}

function* handleUpdateUser(action: any) {
  try {
    const user: IUser = yield call(updateUserProfile, action.payload);
    yield put(updateUserSuccess(user));
  } catch (error: any) {
    const message =
      error?.message ||
      error?.response?.data?.message ||
      "Something went wrong";
    yield put(updateUserFailure(message));
  }
}

export default function* userSaga() {
  yield takeLatest(FETCH_USER_REQUEST, handleFetchUser);
  yield takeLatest(UPDATE_USER_REQUEST, handleUpdateUser);
}
