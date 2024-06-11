// src/redux/actions/userActions.ts

import { User } from "@/models";

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
});

export const fetchUserSuccess = (user: User) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error: string) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

export const updateUserRequest = (userData: {
  username?: string;
  password?: string;
  avatar?: string;
}) => ({
  type: UPDATE_USER_REQUEST,
  payload: userData,
});

export const updateUserSuccess = (user: User) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

export const updateUserFailure = (error: string) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});
