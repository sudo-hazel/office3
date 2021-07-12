/* global pNameToElm*/
window.WS = {};
window.WS.makews = function makews() {
  let ws = new WebSocket(
    "wss://" + window.location.hostname + window.location.pathname
  );

  ws.onopen = () => {
    console.log("[WS Open]");
    if (!window._ps) {
      //Cries in development
      if (window.location === window.parent.location) {
        window._ps = prompt("Password");
      }
    }
    window.WS.send({ type: "auth", pass: String(window._ps) });
  };
  window.WS.ws = ws;
  return ws;
};
window.WS.makews();
window.WS.send = function send(obj) {
  window.WS.ws.send(JSON.stringify(obj));
};
function onmessage(ev) {
  //fix this ALL
  if (ev.data === "connect") {
    return;
  }
  let data = JSON.parse(ev.data);
  console.log(data);
  let type = data.type;
  if (type === "new-pt") {
    pNameToElm(data.name, data.id);
  }
  if (type === "type-sync") {
    document
      .getElementById(data.id)
      .getElementsByClassName(data.classes)[0].value = data.value;
  }

  if (type === "info") {
  }
}
window.WS.ws.onmessage = onmessage;
function close() {
  console.log("[WS Close]");
  window.WS.ws = window.WS.makews();
  window.WS.ws.onmessage = onmessage;
  window.WS.ws.onclose = close;
}
window.WS.ws.onclose = close;
