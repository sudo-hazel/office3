const http = require("http");
const WebSocket = require("ws");
const wsh = require("./wsTypes"); //wsh(andle)
module.exports = (wss) => {
  function noop() {}

  function heartbeat() {
    this.isAlive = true;
  }
  wss.on("connection", (ws) => {
    ws.send('["connect"]');
    ws.isAlive = true;
    ws.on("pong", heartbeat);
    ws.data = {};
    ws.on("message", (msgRaw) => {
      let msg = JSON.parse(msgRaw);
      //If type===Auth
      wsh.auth(ws, msg);
      //If not auth, do not reply
      if (!wsh.auth(ws)) {
        return false;
      }
      wsh.sync(msg, wss, ws);
    });
  });
  setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
      if (ws.isAlive === false) return ws.terminate();
      ws.isAlive = false;
      ws.ping(noop);
    });
  }, 20000);
};
