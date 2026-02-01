const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { createRoom, getRoom } = require("./rooms");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  const room = createRoom("global");

  socket.join("global");

  socket.on("stroke:segment", (data) => {
    room.addSegment(data);
    socket.to("global").emit("stroke:segment", data);
  });

  socket.on("history:undo", () => {
    room.undo();
    io.to("global").emit("canvas:state", room.getState());
  });

  socket.on("history:redo", () => {
    room.redo();
    io.to("global").emit("canvas:state", room.getState());
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
