const express = require('express');
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for testing
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('Server is running');
});

let onlinePlayers = {};

io.on("connection", (socket) => {
  console.log(`🔗 Player connected: ${socket.id}`);

  // Add new player to the list
  onlinePlayers[socket.id] = {
    id: socket.id,
    username: `Hacker${Object.keys(onlinePlayers).length + 1}`
  };

  // Notify all players about the updated player list
  io.emit("updatePlayers", Object.values(onlinePlayers));

  // Handle chat messages
  socket.on("chatMessage", (data) => {
    console.log(`📨 Chat Message from ${socket.id}:`, data);
    // Broadcast to all clients including sender
    io.emit("chatMessage", data);
  });

  // Handle player movement
  socket.on("playerMove", (data) => {
    console.log(`📡 Movement received from ${socket.id}:`, data);
    io.emit("updatePosition", { id: socket.id, ...data });
  });

  // Handle player actions (hacking attempt, commands, etc.)
  socket.on("playerAction", (data) => {
    console.log(`🔥 Action from ${socket.id}:`, data);
    io.emit("updateAction", { id: socket.id, ...data });
  });

  // Handle disconnection
  socket.on("disconnect", (reason) => {
    console.log(`❌ Player disconnected: ${socket.id}, reason: ${reason}`);
    delete onlinePlayers[socket.id];
    io.emit("updatePlayers", Object.values(onlinePlayers));
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Multiplayer server running on port ${PORT}`));

// Handle server shutdown gracefully
process.on('SIGINT', () => {
  console.log('Server shutting down...');
  io.close();
  server.close();
  process.exit(0);
});
