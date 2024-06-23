import type { IResetAppAction } from "../actions/actionTypes";
import type { IAuthAction } from "../actions/authActions";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../actions/authActions";
import { RESET_APP } from "../actions/actionTypes";
import { Reducer } from "redux";

export interface IAuthState {
  loading: boolean;
  loginError: string | null;
  registerError: string | null;
  logoutError: string | null;
}

const initialState: IAuthState = {
  loading: false,
  loginError: null,
  registerError: null,
  logoutError: null,
};

export const authReducer: Reducer<IAuthState, IAuthAction | IResetAppAction> = (
  state: IAuthState = initialState,
  action: IAuthAction | IResetAppAction
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        loginError: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        loginError: action.payload,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        logoutError: action.payload,
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        registerError: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        registerError: action.payload,
      };
    case RESET_APP:
      return initialState;
    default:
      return state;
  }
};
