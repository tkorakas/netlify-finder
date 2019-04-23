import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { createHashHistory } from "history";
import reducers from "./reducers";
import { setToken } from "./netlify/api";
import { push } from "connected-react-router";
const createIpc = window.require("redux-electron-ipc").default;

export const history = createHashHistory();

const ipc = createIpc({
  "oauth-reply": (event, data) => {
    return dispatch => {
      localStorage.setItem("netlify-token", data);
      setToken(data);
      dispatch(push("/"));
    };
  },
  "file-dialog": (event, data) => dispatch =>
    dispatch({ type: "FILE_DIALOG_DATA", data })
});

export default function configureStore(defaultState) {
  const store = createStore(
    reducers(history),
    defaultState,
    compose(applyMiddleware(routerMiddleware(history), thunk, ipc))
  );

  return store;
}
