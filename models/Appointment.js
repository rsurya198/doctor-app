const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  date: Date,
  status: { type: String, default: "pending" },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
