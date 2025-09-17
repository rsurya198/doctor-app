module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("🔌 New client connected:", socket.id);

    // WebRTC signaling
    socket.on("offer", (data) => {
      socket.to(data.target).emit("offer", data);
    });

    socket.on("answer", (data) => {
      socket.to(data.target).emit("answer", data);
    });

    socket.on("ice-candidate", (data) => {
      socket.to(data.target).emit("ice-candidate", data);
    });

    // Queue updates
    socket.on("queue:update", (data) => {
      io.emit("queue:update", data);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
};
