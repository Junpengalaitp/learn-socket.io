const express = require("express");
const app = express();
const socketio = require("socket.io")

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);
const io = socketio(expressServer, {
  path: "/socket.io",
  serverClient: true
});

io.on("connect", socket => {
  socket.emit("messageFromServer", {data: "Welcome to socket.io server"});
  socket.on("messageToServer", dataFromClient => {
    console.log(dataFromClient);
  });
  socket.join("level1")
  io.of("/").to("level1").emit("joined", `${socket.id} I have joined the level one room`)
});

io.of("/admin").on("connect", socket => {
  console.log("Someone connected to the admin namespace")
  io.of("/admin").emit("welcome", "Welcome to the admin channel")
})