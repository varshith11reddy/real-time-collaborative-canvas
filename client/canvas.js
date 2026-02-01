const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineCap = "round";
ctx.lineJoin = "round";

let drawing = false;
let lastPoint = null;
let currentStrokeId = null;

function getCanvasCoordinates(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY
  };
}

function drawSegment(start, end, style) {
  ctx.strokeStyle = style.color;
  ctx.lineWidth = style.width;

  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

canvas.addEventListener("pointerdown", (e) => {
  drawing = true;
  lastPoint = getCanvasCoordinates(e);
  currentStrokeId = crypto.randomUUID();
});

canvas.addEventListener("pointermove", (e) => {
  const pos = getCanvasCoordinates(e);
  sendCursor(pos);

  if (!drawing) return;

  const style = {
    color: document.getElementById("colorPicker").value,
    width: document.getElementById("strokeWidth").value
  };

  drawSegment(lastPoint, pos, style);

  sendStrokeSegment({
    strokeId: currentStrokeId,
    start: lastPoint,
    end: pos,
    style
  });

  lastPoint = pos;
});

canvas.addEventListener("pointerup", () => {
  drawing = false;
  lastPoint = null;
});
