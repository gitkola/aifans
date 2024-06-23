import { all, fork } from "redux-saga/effects";
import appSaga from "./appSaga";
import authSaga from "./authSaga";
import userSaga from "./userSaga";
import themeSaga from "./themeSaga";

export default function* rootSaga() {
  yield all([fork(appSaga), fork(authSaga), fork(userSaga), fork(themeSaga)]);
}
