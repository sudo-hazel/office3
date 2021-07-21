const express = require("express");
//const app = require("./appwrapper");
const port = 8999;
const serverPort = 3000;
const http = require("http");
const app = express();
const server = http.createServer(app);
const WebSocket = require("ws");
const websocketServer = new WebSocket.Server({ server });
const wsswrap = require("./wsswrap");
wsswrap(websocketServer);
//start the web server
server.listen(process.env.PORT || serverPort, () => {
  console.log(`Websocket server started on port ` + serverPort);
  app.use(express.static("public"));
  
  app.listen(port, () => {
    console.log(`app listening ${port}`);
  });
});
