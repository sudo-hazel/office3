/**
 * @typedef {import('ws').Server} WebSocket.Server
 * @typedef {import('ws')} WebSocket
 */
/**
 * @param {WebSocket} ws
 * @param {Object} msg
 * @summary tries to authenticate if not already
 * @returns if authenticated
 */
function auth(ws, msg, wss, id) {
  if (msg && msg.type === "auth") {
    if (msg.pass === process.env.PASS1) {
      ws.data.auth = true;
      ws.data.role = 0;
      ws.send(JSON.stringify({ type: "info", role: 0, id }));
      return true;
    }
    if (msg.pass === process.env.PASS2) {
      ws.data.auth = true;
      ws.data.role = 1;
      ws.send(JSON.stringify({ type: "info", role: 1, id }));
      wss.leader = ws;
      return true;
    }
    return false;
  } else if (!msg) {
    return ws.data.auth;
  }
  return false;
}

/**
 * @param {Object} msg
 * @param {WebSocket.Server} wss
 * @param {WebSocket} ws
 * @summary sends sync to all clients if sync
 * @returns if sync
 */
function sync(msg, wss, ws) {
  //Update is used for basic on typing updates
  if (msg.type === "new-pt" || msg.type === "type-sync") {
    wss.clients.forEach((client) => {
      if (client !== ws) {
        client.send(JSON.stringify(msg));
      }
    });
  }
  if (msg.type === "sync") {
    if (msg.role === 0) { //partner
      wss.squeue.set(msg.id, ws);
      wss.leader && wss.leader.send(JSON.stringify({ type: "sync", id: msg.id }));
    }
    if (msg.role === 1) { //leader
      let id=msg.id;
      let send=msg.data;
      wss.squeue.get(id).send(JSON.stringify({type:"sync", data: send}))
      wss.squeue.delete(id);
    }
  }
  return true;
}
module.exports = { auth, sync };
