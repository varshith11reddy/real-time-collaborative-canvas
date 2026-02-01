# Real-Time Collaborative Drawing Canvas 🎨

A real-time, multi-user drawing application where multiple users can draw simultaneously on a shared canvas. All drawing actions are synchronized instantly across users using WebSockets, with support for global undo/redo.

---

## 🚀 Live Demo

👉 **Live URL:**  
real-time-collaborative-canvas-production-01f5.up.railway.app

Open the link in **two or more browser tabs** to test real-time collaboration.

---

## ✨ Features

- Real-time collaborative drawing
- Multiple users drawing simultaneously
- Smooth canvas rendering using HTML5 Canvas API
- Global Undo / Redo (works across all users)
- Server-authoritative drawing state
- Deployed and production-ready

---

## 🛠 Tech Stack

**Frontend**
- HTML5 Canvas
- JavaScript
- CSS

**Backend**
- Node.js
- Express
- Socket.IO (WebSockets)

**Deployment**
- Railway

---

## 📂 Project Structure

collaborative-canvas/
├── client/
│ ├── index.html
│ ├── style.css
│ ├── canvas.js
│ ├── websocket.js
│ └── main.js
├── server/
│ ├── server.js
│ ├── rooms.js
│ └── state-manager.js
├── package.json
├── package-lock.json
└── .gitignore


---

## ▶️ Running Locally

### Prerequisites
- Node.js v18 or higher
- npm

### Steps

```bash
git clone https://github.com/varshith11reddy/real-time-collaborative-canvas.git
cd collaborative-canvas
npm install
npm start

Then open:
http://localhost:3000

How to Test Real-Time Collaboration

Open the app in two or more browser windows

Start drawing in one window

See the drawing appear instantly in the others

Click Undo in any window → all canvases update together


Author
VARSHITH REDDY KATPALLY
