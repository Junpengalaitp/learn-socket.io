const express = require("express");
const app = express();
const socketio = require("socket.io")

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);
const io = socketio(expressServer, {
  path: "/socket.io",
  serverClient: true
});

io.on("connection", socket => {
  socket.emit("messageFromServer", {data: "Welcome to socket.io server"});
  socket.on("messageToServer", dataFromClient => {
    console.log(dataFromClient);
  });
});