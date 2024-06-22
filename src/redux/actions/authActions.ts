import { Action } from "redux";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export interface ICredentials {
  username: string;
  password: string;
}

export interface IRegisterData {
  email: string;
  password: string;
  username?: string;
}

export interface ILoginRequestAction extends Action {
  type: typeof LOGIN_REQUEST;
  payload: ICredentials;
}
export const loginRequest = (
  credentials: ICredentials
): ILoginRequestAction => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

export interface ILoginSuccessAction extends Action {
  type: typeof LOGIN_SUCCESS;
}
export const loginSuccess = (): ILoginSuccessAction => ({
  type: LOGIN_SUCCESS,
});

export interface ILoginFailureAction extends Action {
  type: typeof LOGIN_FAILURE;
  payload: string;
}
export const loginFailure = (error: string): ILoginFailureAction => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export interface ILogoutRequestAction extends Action {
  type: typeof LOGOUT_REQUEST;
}
export const logoutRequest = (): ILogoutRequestAction => ({
  type: LOGOUT_REQUEST,
});

export interface ILogoutSuccessAction extends Action {
  type: typeof LOGOUT_SUCCESS;
}
export const logoutSuccess = (): ILogoutSuccessAction => ({
  type: LOGOUT_SUCCESS,
});

export interface ILogoutFailureAction extends Action {
  type: typeof LOGOUT_FAILURE;
  payload: string;
}
export const logoutFailure = (error: string): ILogoutFailureAction => ({
  type: LOGOUT_FAILURE,
  payload: error,
});

export interface IRegisterRequestAction extends Action {
  type: typeof REGISTER_REQUEST;
  payload: IRegisterData;
}
export const registerRequest = (
  userData: IRegisterData
): IRegisterRequestAction => ({
  type: REGISTER_REQUEST,
  payload: userData,
});

export interface IRegisterSuccessAction extends Action {
  type: typeof REGISTER_SUCCESS;
}
export const registerSuccess = (): IRegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
});

export interface IRegisterFailureAction extends Action {
  type: typeof REGISTER_FAILURE;
  payload: string;
}
export const registerFailure = (error: string): IRegisterFailureAction => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export type IAuthAction =
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailureAction
  | ILogoutRequestAction
  | ILogoutSuccessAction
  | ILogoutFailureAction
  | IRegisterRequestAction
  | IRegisterSuccessAction
  | IRegisterFailureAction;
