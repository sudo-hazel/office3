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
function auth(ws, msg, wss) {
  if (!(ws.data && ws.data.auth) && msg && msg.type === "Auth") {
    if (msg.pass === process.env.PASS1) {
      ws.data.auth = true;
      ws.data.role = 0;
      ws.send(JSON.stringify({ type: "info", data: "partner" }));
      return true;
    }
    if (msg.pass === process.env.PASS2) {
      ws.data.auth = true;
      ws.data.role = 1;
      ws.send(JSON.stringify({ type: "info", data: "leader" }));
      wss.leader=ws;
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
  if (!(msg.type === "sync" || msg.type === "update")) {
    return false;
  }
  //Update is used for basic on typing updates
  if (msg.type==="update"){
    wss.clients.forEach((client) => {
      if (client !== ws) {
        client.send(JSON.stringify(msg));
      }
    })
  };
  if (msg.type==="sync"){
    if (msg.data.role==="partner"){
      wss.leader.send(JSON.stringify({type:"sync"}))
    }
  };
  return true;
}
module.exports = { auth, sync };
