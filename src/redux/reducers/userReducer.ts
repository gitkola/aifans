import type { IUser } from "@/types";
import type { IUserAction } from "../actions/userActions";
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  SET_USER,
} from "../actions/userActions";
import type { IResetAppAction } from "../actions/actionTypes";
import { RESET_APP } from "../actions/actionTypes";
import { Reducer } from "redux";

export interface IUserState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: IUserState = {
  user: null,
  loading: false,
  error: null,
};

export const userReducer: Reducer<IUserState, IUserAction | IResetAppAction> = (
  state: IUserState = initialState,
  action: IUserAction | IResetAppAction
) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case RESET_APP:
      return initialState;
    default:
      return state;
  }
};
