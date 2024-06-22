import { IUser } from "@/types";
import { Action } from "redux";

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";
export const SET_USER = "SET_USER";

export interface IUpdateUserPayload {
  username?: string;
  email?: string;
  password?: string;
  avatar?: string;
}

export interface ISetUserAction extends Action {
  type: typeof SET_USER;
  payload: IUser | null;
}
export const setUser = (user: IUser | null): ISetUserAction => ({
  type: SET_USER,
  payload: user,
});

export interface IFetchUserRequestAction extends Action {
  type: typeof FETCH_USER_REQUEST;
}
export const fetchUserRequest = (): IFetchUserRequestAction => ({
  type: FETCH_USER_REQUEST,
});

export interface IFetchUserSuccessAction extends Action {
  type: typeof FETCH_USER_SUCCESS;
  payload: IUser;
}
export const fetchUserSuccess = (user: IUser): IFetchUserSuccessAction => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export interface IFetchUserFailureAction extends Action {
  type: typeof FETCH_USER_FAILURE;
  payload: string;
}
export const fetchUserFailure = (error: string): IFetchUserFailureAction => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

export interface IUpdateUserRequestAction extends Action {
  type: typeof UPDATE_USER_REQUEST;
  payload: IUpdateUserPayload;
}
export const updateUserRequest = (
  userData: IUpdateUserPayload
): IUpdateUserRequestAction => ({
  type: UPDATE_USER_REQUEST,
  payload: userData,
});

export interface IUpdateUserSuccessAction extends Action {
  type: typeof UPDATE_USER_SUCCESS;
  payload: IUser;
}
export const updateUserSuccess = (user: IUser): IUpdateUserSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

export interface IUpdateUserFailureAction extends Action {
  type: typeof UPDATE_USER_FAILURE;
  payload: string;
}
export const updateUserFailure = (error: string): IUpdateUserFailureAction => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});

export type IUserAction =
  | ISetUserAction
  | IFetchUserRequestAction
  | IFetchUserSuccessAction
  | IFetchUserFailureAction
  | IUpdateUserRequestAction
  | IUpdateUserSuccessAction
  | IUpdateUserFailureAction;
