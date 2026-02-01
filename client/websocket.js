const socket = io("http://localhost:3000");

function sendStrokeSegment(data) {
  socket.emit("stroke:segment", data);
}

function sendCursor(pos) {
  socket.emit("cursor:update", pos);
}

function requestUndo() {
  socket.emit("history:undo");
}

function requestRedo() {
  socket.emit("history:redo");
}
