let DEBUG = false;
if(window.location.hostname ==="127.0.0.1" || window.location.hostname ==="localhost"){
  DEBUG = true
}
let HOST_URL = "https://" + window.location.hostname;
let SOCKET_URL = "wss://"+window.location.hostname;
if (DEBUG) {
  HOST_URL = "http://"+window.location.hostname + ":8000";
  SOCKET_URL = "ws://"+window.location.hostname +":8000";
}

export { HOST_URL, SOCKET_URL };
