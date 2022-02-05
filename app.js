const express = require("express");
const socket = require("socket.io");

// app setup
const app = express();
const server = app.listen(3000, () => {
  console.log("listenning to request on port 3000");
});

// static files
app.use(express.static("public"));

// socket setup
const io = socket(server);

io.on("connection", (socket) => {
  console.log("a user connected id", socket.id);

  socket.on("chat", (data) => {
    io.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
