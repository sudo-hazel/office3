/* global pNameToElm*/
window.WS = {};
window.WS.makews = function makews() {
  let ws = new WebSocket(
    "wss://" + window.location.hostname + window.location.pathname
  );

  ws.onopen = () => {
    console.log("[WS Open]")
    if (!window._ps) {
      //Cries in development
      if ( window.location === window.parent.location ) {window._ps = prompt("Password");}
    }
    ws.send(JSON.stringify({ type: "Auth", pass: window._ps + "" }));
  };
  window.WS.ws = ws;
  return ws;
};
window.WS.makews();
window.WS.send = function send(obj,type="update") {
  window.WS.ws.send(JSON.stringify({ type: type, data: obj }));
};
function onmessage(ev) {
  if (ev.data === "connect") {
    return;
  }
  let msg = JSON.parse(ev.data);
  console.log(msg);
  let type = msg.type;
  if (type === "update") {
    let data = msg.data;

    if (data[0] === "new-pt") {
      pNameToElm(data[1].name, data[1].id);
    }
    if (data[0] === "type-sync") {
      document
        .getElementById(data[1].id)
        .getElementsByClassName(data[1].classes)[0].value = data[1].value;
    }
  }
  if (type === "info") {
  }
}
window.WS.ws.onmessage = onmessage;
function close() {
  console.log("[WS Close]");
  window.WS.ws = window.WS.makews();
  window.WS.ws.onmessage = onmessage;
  window.WS.ws.onclose= close;
}
window.WS.ws.onclose = close