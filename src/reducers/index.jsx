import { combineReducers, createStore } from "redux";
import websocketReducer from './websocket';

const appReducer = combineReducers({
  websocketReducer
});

const appStore = createStore(appReducer);
export default appStore;
