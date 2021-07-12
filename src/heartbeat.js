function noop() {}

function heartbeat() {
    this.isAlive = true;
}
function pinger(wss){
  setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
      if (ws.isAlive === false) return ws.terminate();
      ws.isAlive = false;
      ws.ping(noop);
    });
  }, 20000);
}
function defib(ws){
  ws.send('["connect"]');
  ws.isAlive = true;
  ws.on("pong", heartbeat.bind(ws));
  ws.data = {};
}
module.exports={ping: pinger, heart: defib}