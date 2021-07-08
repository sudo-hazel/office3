window.WS = {};
window.WS.makews = function makews() {
  let ws = new WebSocket(
    "wss://" + window.location.hostname + window.location.pathname
  );

  ws.onopen = () => {
    if (!window._ps) {
      window._ps = prompt("Password");
    }
    ws.send(JSON.stringify({ type: "Auth", pass: window._ps + "" }));
  };
  window.WS.ws = ws;
  return ws;
};
window.WS.makews();
window.WS.send = function send(obj) {
  window.WS.ws.send(JSON.stringify({ type: "update", data: obj }));
};
