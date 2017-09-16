import {
  WEBSOCKET_ON_ERROR,
  WEBSOCKET_ON_OPEN,
  WEBSOCKET_REQUEST_OPEN,
  WEBSOCKET_ON_CLOSE,
  WEBSOCKET_REQUEST_CLOSE,
} from './../actions';

import _ from 'lodash';

const initialState = () => {};

export function WebsocketReducer(state=initialState(), action) {
  switch(action.type) {
    case WEBSOCKET_ON_OPEN: {
      state.open = true;
      state.pending = false;
      break;
    }
    case WEBSOCKET_REQUEST_OPEN: {
      state.pending = true;
      break;
    }
    case WEBSOCKET_ON_CLOSE: {
      state.pending = false; 
      state.open = false; 
      break;
    }
    case WEBSOCKET_REQUEST_CLOSE: {
      state.pending = true; 
      break;
    }
    case WEBSOCKET_ON_ERROR: {
      state.error = true;
      break;
    }
  }
  return state;
}
