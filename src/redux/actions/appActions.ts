import { Action } from "redux";

export const APP_INIT_REQUEST = "APP_INIT_REQUEST";
export const APP_INIT_SUCCESS = "APP_INIT_SUCCESS";
export const APP_INIT_FAILURE = "APP_INIT_FAILURE";

export interface IAppInitRequestAction extends Action {
  type: typeof APP_INIT_REQUEST;
}
export const appInitRequest = (): IAppInitRequestAction => ({
  type: APP_INIT_REQUEST,
});

export interface IAppInitSuccessAction extends Action {
  type: typeof APP_INIT_SUCCESS;
}
export const appInitSuccess = (): IAppInitSuccessAction => ({
  type: APP_INIT_SUCCESS,
});

export interface IAppInitFailureAction extends Action {
  type: typeof APP_INIT_FAILURE;
  payload: string;
}
export const appInitFailure = (error: string): IAppInitFailureAction => ({
  type: APP_INIT_FAILURE,
  payload: error,
});

export type IAppAction =
  | IAppInitRequestAction
  | IAppInitSuccessAction
  | IAppInitFailureAction;
