# Architecture – Real-Time Collaborative Drawing Canvas

## Overview

The application is a real-time, multi-user drawing system built using a client–server architecture.  
The server is the single source of truth, while clients act as fast renderers that optimistically draw and synchronize state via WebSockets.

---

## High-Level Architecture

- **Client**
  - Captures pointer events
  - Renders strokes immediately for smooth UX
  - Sends drawing events to the server
  - Re-renders canvas based on server state updates

- **Server**
  - Manages WebSocket connections
  - Maintains global drawing state
  - Broadcasts drawing events to all connected clients
  - Handles global undo/redo logic

---

## Data Flow

1. User moves pointer on canvas
2. Client converts screen coordinates to canvas coordinates
3. Client draws locally (client-side prediction)
4. Client emits stroke segment via WebSocket
5. Server receives and stores the segment
6. Server broadcasts the segment to all other clients
7. All clients render the segment in the same order

This ensures low latency while maintaining consistent state.

---

## WebSocket Protocol

### Events Emitted by Client

- `stroke:segment`
```json
{
  "strokeId": "uuid",
  "start": { "x": 120, "y": 80 },
  "end": { "x": 130, "y": 90 },
  "style": { "color": "#000000", "width": 5 }
}
history:undo

history:redo

Events Emitted by Server
stroke:segment
Broadcasts drawing updates to all connected clients

canvas:state
Sends the full stroke history after undo/redo

Stroke-Based State Model
Instead of syncing pixels, the system synchronizes intent.

Each stroke consists of:

Stroke ID

Drawing style (color, width, tool)

Ordered list of points

The canvas is a pure renderer of stroke history.

Undo / Redo Strategy (Global)
Undo and redo are handled server-side.

Undo
Server removes the last stroke from the global history

Stroke is pushed to a redo stack

Server broadcasts updated state

Clients clear canvas and replay history

Redo
Server restores the last undone stroke

Broadcasts updated history

Clients re-render deterministically

Undo affects all users, ensuring global consistency.

Conflict Handling
Simultaneous drawing conflicts are resolved by server ordering.

All strokes are appended in the order received

No pixel-level merging is attempted

Last-write-wins visually

This approach avoids complex and error-prone conflict resolution.

Performance Decisions
Stroke segments are sent instead of full paths

Pointer events are implicitly throttled by browser event rate

Canvas redraw occurs only on undo/redo

No full canvas repaint during normal drawing

This keeps latency low and drawing smooth.

Scalability Considerations
Current design supports multiple concurrent users per canvas.

To scale further:

Throttle or batch stroke segments

Introduce rooms per canvas

Use Redis adapter for Socket.IO

Persist stroke history externally if required