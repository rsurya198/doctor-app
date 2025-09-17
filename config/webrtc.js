// STUN/TURN server config
module.exports = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" }, // Free STUN
    // Add TURN server later for production
  ],
};
