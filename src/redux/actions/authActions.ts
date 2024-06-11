// src/redux/actions/authActions.ts

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const loginRequest = (credentials: {
  username: string;
  password: string;
}) => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const registerRequest = (userData: {
  username: string;
  email?: string;
  password: string;
}) => ({
  type: REGISTER_REQUEST,
  payload: userData,
});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});

export const registerFailure = (error: string) => ({
  type: REGISTER_FAILURE,
  payload: error,
});
