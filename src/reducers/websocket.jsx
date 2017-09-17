import {
  WEBSOCKET_ON_ERROR,
  WEBSOCKET_ON_OPEN,
  WEBSOCKET_REQUEST_OPEN,
  WEBSOCKET_ON_CLOSE,
  WEBSOCKET_REQUEST_CLOSE,
} from './../actions';

import _ from 'lodash';

const initialState = () => ({});

export default function (state=initialState(), action) {
  switch(action.type) {
    case WEBSOCKET_ON_OPEN: {
      state.open = true;
      state.pending = false;
      return Object.assign({}, state);
    }
    case WEBSOCKET_REQUEST_OPEN: {
      state.pending = true;
      return Object.assign({}, state);
    }
    case WEBSOCKET_ON_CLOSE: {
      state.pending = false; 
      state.open = false; 
      state.closed = true;
      return Object.assign({}, state);
    }
    case WEBSOCKET_REQUEST_CLOSE: {
      state.pending = true; 
      return Object.assign({}, state);
    }
    case WEBSOCKET_ON_ERROR: {
      state.error = true;
      return Object.assign({}, state);
    }
  }

  return state;
  
}
