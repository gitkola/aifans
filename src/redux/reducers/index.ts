import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { authReducer } from "./authReducer";
import { userReducer } from "./userReducer";
import { themeReducer } from "./themeReducer";

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  theme: themeReducer,
});

export default rootReducer;
