/* global pNameToElm*/

window.WS.ws.onmessage = (ev) => {
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
};
window.WS.ws.onclose = function (event) {
  //this doesn't really work lol
  window.WS.ws = window.WS.makews();
};
