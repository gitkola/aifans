// src/redux/store.ts

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper(makeStore);
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<typeof rootReducer>;
