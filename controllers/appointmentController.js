const Appointment = require("../models/Appointment");

exports.createAppointment = async (req, res) => {
  const appointment = await Appointment.create(req.body);
  res.json(appointment);
};

exports.getAppointments = async (req, res) => {
  const appointments = await Appointment.find().populate("doctor patient");
  res.json(appointments);
};
