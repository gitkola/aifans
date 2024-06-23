import type { IAppAction } from "@/redux/actions/appActions";
import {
  APP_INIT_REQUEST,
  APP_INIT_SUCCESS,
  APP_INIT_FAILURE,
} from "@/redux/actions/appActions";
import { Reducer } from "redux";

export interface IAppState {
  initialized: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: IAppState = {
  initialized: false,
  loading: false,
  error: null,
};

export const appReducer: Reducer<IAppState, IAppAction> = (
  state: IAppState = initialState,
  action: IAppAction
) => {
  switch (action.type) {
    case APP_INIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case APP_INIT_SUCCESS:
      return {
        ...state,
        initialized: true,
        loading: false,
      };
    case APP_INIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
