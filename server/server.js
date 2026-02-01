const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { createRoom, getRoom } = require("./rooms");

const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "../client")));

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

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

