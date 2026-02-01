const { DrawingState } = require("./state-manager");

const rooms = new Map();

function createRoom(id) {
  if (!rooms.has(id)) {
    rooms.set(id, new DrawingState());
  }
  return rooms.get(id);
}

function getRoom(id) {
  return rooms.get(id);
}

module.exports = { createRoom, getRoom };
