require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Config + routes
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const queueRoutes = require("./routes/queueRoutes");
const socketHandlers = require("./socketHandlers");

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
connectDB();

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/queue", queueRoutes);

// Serve frontend (doctor UI)
app.use(express.static(path.join(__dirname, "../")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Home.html"));
});

// Socket.IO server
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
socketHandlers(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
