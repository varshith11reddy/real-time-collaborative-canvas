class DrawingState {
  constructor() {
    this.strokes = [];
    this.redoStack = [];
    this.activeStrokes = new Map();
  }

  addSegment({ strokeId, start, end, style }) {
    if (!this.activeStrokes.has(strokeId)) {
      this.activeStrokes.set(strokeId, {
        strokeId,
        style,
        points: [start]
      });
      this.strokes.push(this.activeStrokes.get(strokeId));
    }

    this.activeStrokes.get(strokeId).points.push(end);
  }

  undo() {
    if (this.strokes.length === 0) return;
    this.redoStack.push(this.strokes.pop());
  }

  redo() {
    if (this.redoStack.length === 0) return;
    this.strokes.push(this.redoStack.pop());
  }

  getState() {
    return this.strokes;
  }
}

module.exports = { DrawingState };
