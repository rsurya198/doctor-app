const mongoose = require("mongoose");

const QueueSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  status: { type: String, default: "waiting" },
});

module.exports = mongoose.model("Queue", QueueSchema);
