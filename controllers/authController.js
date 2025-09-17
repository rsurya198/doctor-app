const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

// Doctor signup
exports.registerDoctor = async (req, res) => {
  const { name, email, password, specialization } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const doctor = await Doctor.create({ name, email, password: hashed, specialization });
  res.json(doctor);
};

// Patient signup
exports.registerPatient = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const patient = await Patient.create({ name, email, password: hashed });
  res.json(patient);
};

// Login (doctor or patient)
exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  const Model = role === "doctor" ? Doctor : Patient;

  const user = await Model.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, user });
};
