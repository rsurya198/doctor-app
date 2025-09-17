const Queue = require("../models/Queue");

exports.addToQueue = async (req, res) => {
  const queue = await Queue.create(req.body);
  res.json(queue);
};

exports.getQueue = async (req, res) => {
  const queue = await Queue.find().populate("doctor patient");
  res.json(queue);
};
