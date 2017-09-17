export const WEBSOCKET_ON_ERROR = "WEBSOCKET_ON_ERROR";
export const WEBSOCKET_ON_OPEN = "WEBSOCKET_ON_OPEN";
export const WEBSOCKET_REQUEST_OPEN = "WEBSOCKET_REQUEST_OPEN"
export const WEBSOCKET_ON_CLOSE = "WEBSOCKET_ON_CLOSE";
export const WEBSOCKET_REQUEST_CLOSE = "WEBSOCKET_REQUEST_CLOSE"

export const websocketRequestClose = () => ({
  type: WEBSOCKET_REQUEST_CLOSE
});

export const websocketOnClose = () => ({
  type: WEBSOCKET_ON_CLOSE
});

export const websocketRequestOpen = () => ({
  type: WEBSOCKET_REQUEST_OPEN
});

export const websocketOnOpen = () => ({
  type: WEBSOCKET_ON_OPEN
});

export const websocketOnError = () => ({
  type: WEBSOCKET_ON_ERROR
});
