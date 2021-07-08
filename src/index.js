console.log(b);
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
//when a websocket connection is established
/*
websocketServer.on("connection", (webSocketClient) => {
  //send feedback to the incoming connection
  webSocketClient.send('{ "connection" : "ok"}');

  //when a message is received
  webSocketClient.on("message", (message) => {
    //for each websocket client
    websocketServer.clients.forEach((client) => {
      //send the client the current message
      client.send(`{ "message" : ${message} }`);
    });
  });
});*/

//start the web server
server.listen(serverPort, () => {
  console.log(`Websocket server started on port ` + serverPort);
  app.use(express.static("public"));

  app.listen(port, () => {
    console.log(`app listening ${port}`);
  });
});
