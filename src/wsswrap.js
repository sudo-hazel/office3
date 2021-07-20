const http = require("http");
const WebSocket = require("ws");
const {heart, ping} = require("./heartbeat.js")
const wsh = require("./wsTypes"); //wsh(andle)
module.exports = wss => {
  //defined
  function noop() {}

  function heartbeat() {
    this.isAlive = true;
  }
  let id=Date.now();
  wss.squeue = new Map();
  wss.on("connection", ws => {
    id++;
    heart(ws);
    ws.on("message", msgRaw => {
      let msg = JSON.parse(msgRaw);
      //If type===Auth
      wsh.auth(ws, msg, wss, id);
      //If not auth, do not reply
      if (!wsh.auth(ws)) {
        return false;
      }
      wsh.sync(msg, wss, ws);
    });
  });
  ping(wss)
};
