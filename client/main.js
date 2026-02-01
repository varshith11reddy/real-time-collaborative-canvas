document.getElementById("undoBtn").onclick = () => {
  requestUndo();
};

document.getElementById("redoBtn").onclick = () => {
  requestRedo();
};

socket.on("stroke:segment", (data) => {
  drawSegment(data.start, data.end, data.style);
});

socket.on("canvas:state", (history) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  history.forEach(stroke => {
    for (let i = 1; i < stroke.points.length; i++) {
      drawSegment(
        stroke.points[i - 1],
        stroke.points[i],
        stroke.style
      );
    }
  });
});
