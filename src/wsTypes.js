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
function auth(ws, msg) {
  if (!ws.data?.auth && msg?.type === "Auth") {
    if (msg.pass === process.env.PASS1) {
      ws.data.auth = true;
      ws.data.role = 0;
      ws.send(JSON.stringify({ type: "info", data: "sync" }));
      return true;
    }
    if (msg.pass === process.env.PASS2) {
      ws.data.auth = true;
      ws.data.role = 1;
      ws.send(JSON.stringify({ type: "info", data: "leader" }));
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
  wss.clients.forEach((client) => {
    if (client !== ws) {
      client.send(JSON.stringify(msg));
    }
  });
  return true;
}
module.exports = { auth, sync };
