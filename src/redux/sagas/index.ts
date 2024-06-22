import { all, fork } from "redux-saga/effects";
import authSaga from "./authSaga";
import userSaga from "./userSaga";
import themeSaga from "./themeSaga";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(userSaga), fork(themeSaga)]);
}
