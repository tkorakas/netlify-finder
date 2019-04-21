import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import sites from "./sitesReducer";
import settings from "./settingsReducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    sites,
    settings
  });
