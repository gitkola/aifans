import { IAuthAction } from "./authActions";
import { ISetThemeAction } from "./themeActions";
import { IUserAction } from "./userActions";

export const RESET_APP = "RESET_APP";

export interface IResetAppAction {
  type: typeof RESET_APP;
}
export type AppActions =
  | IAuthAction
  | ISetThemeAction
  | IUserAction
  | IResetAppAction;
